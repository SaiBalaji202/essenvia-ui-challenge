import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, limit: number = 10): string {
    if (value.length > limit) {
      return value.substr(0, limit) + '...';
    }
    return value;
  }
}
