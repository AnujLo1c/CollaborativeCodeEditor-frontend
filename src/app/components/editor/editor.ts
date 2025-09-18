import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { Subscription } from 'rxjs';
import { log } from 'node:console';
import { ProjectService } from '../../service/project-service';
import { ActivatedRoute, Router } from '@angular/router';


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
 title = signal('Project Title');
  constructor(
    private projectService: ProjectService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute, private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

shareId!: string | null;
  projectId!: string|null;
    loading = signal(true);
  async ngAfterViewInit(): Promise<void> {
    if (this.isBrowser) {
       this.initializeAceEditor();
    }
    await this.initializeProject();

    // this.router.navigate(['/project'], { replaceUrl: true });
  }
  async initializeProject() {
  
    try {
      
      
  
this.projectId = this.route.snapshot.paramMap.get('id')!;
      console.log("Project ID from route:", this.projectId);
const fetchedProject = await this.projectService.checkAndOpenProject(
        this.projectId);
      // this.aceEditor.setValue(

      //   (fetchedProject['codeContent'] || []).join('\n'));
   
this.aceEditor.setValue('console.log("Hello, world!");');
     
        console.log("fetchted"+(fetchedProject['codeContent'] || []).join('\n'));
      this.projectService.setCode((fetchedProject['codeContent'] || []).join('\n'));
      console.log("Fetched project:", fetchedProject.name);
      
      this.title.set(fetchedProject.name??"title");
       console.log("FEtched proj" + fetchedProject.name+ " " );   
    } catch (error) {
      console.error("Error opening project:", error);
    } finally {
      console.log("Setting loading to false");
      
      this.loading.set(false);
     
    }

    this.subscription = this.projectService.code$.subscribe((code) => {
      
      this.aceEditor.setValue(code);      
    });
  }


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
this.projectId=this.route.snapshot.paramMap.get('id')!;
//TODO: update code on every change
    // this.projectService.updateProjectCode(this.projectId, this.aceEditor.getValue());

///////

    const language = this.aceEditor.session.getMode().$id.replace("ace/mode/", "");
    const codepart = this.aceEditor.getValue();

    try {
      const result: string = await this.projectService.runProject(language, codepart);

      this.output.set(result);
    } catch (error) {
      console.error("Error running project:", error);
    }
  }

  async generateShareableLink() {
  this.projectId = this.route.snapshot.paramMap.get('id')!;
  const shareableLink = await this.projectService.generateShareableLink(this.projectId);
 navigator.clipboard.writeText(shareableLink).then(() => {
    alert('Share link copied to clipboard: ' + shareableLink['link']);
  }).catch(err => {
    console.error('Failed to copy link:', err);
  });
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
