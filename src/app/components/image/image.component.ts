import { Component, OnInit } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const worker = createWorker({
      logger: m => console.log(m),
      corePath: '../../../assets/img/tesseract-core.wasm.js',
      workerPath: '../../../assets/img/worker.min.js',
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize('../../../assets/img/prueb.png');
      console.log(text);
      await worker.terminate();
    })();
  }

}
