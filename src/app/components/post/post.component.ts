import { Component, Inject } from '@angular/core';
import { fabric } from 'fabric';

const AUTHOR_OFFSET = 65
const DESC_OFFSET = 80
const CONTENT_EXTRA_HEIGHT = 55

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends fabric.Group {

  constructor(@Inject(Object) options:any) { 
    var title = new fabric.Textbox(options.title, {
      name: 'title',
      width: 280,
      left: 18,
      top: 60,
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Helvetica',
      fill: '#000000',
      splitByGrapheme: true
    });
  
    var author = new fabric.Textbox(options.author, {
      name: 'author',
      width: 300,
      left: 18,
      top: title.getScaledHeight() + AUTHOR_OFFSET,
      fontSize: 13,
      fontFamily: 'Helvetica',
      fill: '#555555',
      splitByGrapheme: true,
    });

    var desc = new fabric.Textbox(options.desc.length > 200 ? options.desc.substr(0, 200) + '...' : options.desc, {
      name: 'desc',
      width: 300,
      left: 18,
      top: author.getScaledHeight() + title.getScaledHeight() + DESC_OFFSET,
      fontSize: 15,
      fontFamily: 'Helvetica',
      fill: '#000000',
      splitByGrapheme: true
    });
    
    var commentButton = new fabric.Textbox('💬', {
      name: 'comment',
      width: 100,
      top: title.getScaledHeight() + author.getScaledHeight() + desc.getScaledHeight() + 90,
      left: 18,
      fontSize: 20,
      fontFamily: 'Helvetica',
      fill: '#000000',
      splitByGrapheme: true
    });

    var commentCount = new fabric.Textbox('0', {
      name: 'commentCount',
      width: 100,
      top: title.getScaledHeight() + author.getScaledHeight() + desc.getScaledHeight() + 90,
      left: 50,
      fontSize: 20,
      fontFamily: 'Helvetica',
      fill: '#555555',
      splitByGrapheme: true
    });

    var content = new fabric.Rect({
      name: 'content',
      top: 40,
      width: 330,
      height: title.getScaledHeight() + author.getScaledHeight() + desc.getScaledHeight() + commentButton.getScaledHeight() + CONTENT_EXTRA_HEIGHT,
      fill: '#F4D74B',
      rx: 20, 
      ry: 20,
    });

    const groupOptions = {
      name: 'post',
      left: options.left - (330 / 2),
      top: options.top - ((content.height ?? 0) / 2),
      hasControls: false,
      transparentCorners: false,
      cornerSize: 7,
      lockMovementX: options.lock,
      lockMovementY: options.lock,
      title: options.title,
      desc: options.desc,
      author: options.author,
      authorID: options.authorID
    }

    super([content, title, author, desc, commentButton, commentCount], groupOptions);
  };
}