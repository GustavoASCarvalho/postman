import { Component } from '@angular/core';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

interface RequestInfo {
  id: number;
  name: string;
  method: HttpMethod;
  url: string;
  type: 'HTTP';
  headers: Record<string, string>;
  body: string;
  active: boolean;
}

@Component({
  selector: 'app-request',
  imports: [],
  host: {
    class: 'block h-full',
  },
  templateUrl: './request.html',
  styleUrl: './request.css',
})
export class Request {
  protected readonly httpMethods: HttpMethod[] = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'HEAD',
    'OPTIONS',
  ];

  protected requests: RequestInfo[] = [];

  protected get activeRequestInfo(): RequestInfo | undefined {
    return this.requests.find((request) => request.active);
  }

  protected newRequest() {
    this.desactiveAllRequests();

    this.requests.push({
      id: this.requests.length + 1,
      name: `Request ${this.requests.length + 1}`,
      method: 'GET',
      url: 'https://api.example.com/data',
      type: 'HTTP',
      headers: {
        'Content-Type': 'application/json',
      },
      body: '',
      active: true,
    });
  }

  protected removeRequest(id: number) {
    this.requests = this.requests.filter((request) => request.id !== id);
  }

  protected desactiveAllRequests() {
    this.requests = this.requests.map((request) => ({
      ...request,
      active: false,
    }));
  }

  protected activeRequest(id: number) {
    this.requests = this.requests.map((request) => ({
      ...request,
      active: request.id === id,
    }));
  }

  protected changeActiveRequestMethod(event: Event) {
    const activeRequest = this.activeRequestInfo;
    if (!activeRequest) return;

    const method = (event.target as HTMLSelectElement).value as HttpMethod;

    this.requests = this.requests.map((request) => ({
      ...request,
      method: request.id === activeRequest.id ? method : request.method,
    }));
  }
}
