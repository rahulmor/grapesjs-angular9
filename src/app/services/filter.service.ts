import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class FilterService {

    private subject = new Subject<any>();
    private dataSource = new BehaviorSubject<any>({ url: 'home' });
    data = this.dataSource.asObservable();
    sendData(message: string) {
        this.subject.next(message);
    }

    clearData() {
        this.subject.next();
    }

    getData(): Observable<any> {
        return this.subject.asObservable();
    }
    setCurrentUrl(data) {
        this.dataSource.next(data);
    }
}
