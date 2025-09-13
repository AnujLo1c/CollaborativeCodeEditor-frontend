import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { Subscription } from 'rxjs';
import { log } from 'node:console';
import { ProjectService } from '../../service/project-service';


declare var ace: any;

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editor.html',
  styleUrls: ['./editor.scss']
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;
  // @ViewChild('editorContainer', { static: false }) editorRef!: ElementRef;

  private aceEditor: any;
  private subscription?: Subscription;
  currentCode = '';
  isBrowser: boolean;
  output = signal<string>('');
  constructor(
    private projectService: ProjectService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
      this.initializeAceEditor();
    }
    try {
      // Show loading screen automatically because `loading = true`
      const fetchedProject = await this.projectService.checkAndOpenProject("123"); // your async function
      this.aceEditor.setValue(
        fetchedProject.code
      );
      console.log(fetchedProject);

    } catch (error) {
      console.error("Error opening project:", error);
    } finally {
      // Hide loading screen when done
      this.loading = false;
    }

    this.subscription = this.projectService.code$.subscribe((code) => {
      this.aceEditor.setValue(code); // update editor content
     
    });

  }
  loading: boolean = true; // true while loading

  private initializeAceEditor(): void {
    if (!this.isBrowser) return;

    const container = this.editorContainer.nativeElement;
    if (container && typeof ace !== 'undefined') {
      this.aceEditor = ace.edit(container);

      this.aceEditor.setTheme('ace/theme/monokai');
      this.aceEditor.session.setMode('ace/mode/python');


      ace.require('ace/ext/language_tools');
      this.aceEditor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true
      });
    }
  }
  async runCode(): Promise<void> {
    console.log(this.aceEditor.getValue());
    console.log("asdfweasdfwef");
    
    this.projectService.updateProjectCode("123", this.aceEditor.getValue());
    // const language = this.aceEditor.session.getMode().$id.replace("ace/mode/", "");
    // const codepart = this.aceEditor.getValue();

    // try {
    //   const result: string = await this.projectService.runProject(language, codepart);

    //   this.output.set(result);
    // } catch (error) {
    //   console.error("Error running project:", error);
    // }
  }


  logCode(): void {
    console.log(this.aceEditor?.getValue());
  }

  downloadCode(): void {
    if (!this.aceEditor) return;
    const code = this.aceEditor.getValue();
    const mode = this.aceEditor.session.getMode().$id.replace('ace/mode/', '');
    const filename = `code.${mode}`;

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    const type = target.getAttribute('data-type');

    if (!this.aceEditor) return;

    switch (type) {
      case 'theme':
        this.aceEditor.setTheme(`ace/theme/${value}`);
        break;
      case 'mode':
        this.aceEditor.session.setMode(`ace/mode/${value}`);
        break;
      case 'keyboard':
        this.aceEditor.setKeyboardHandler(value || null);
        break;
    }
  }
}
