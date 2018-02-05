import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const queryAllCourses = gql`
query allCourses {
  allCourses {
    id
    name
    done
    category {
      id
    }
  }
}
`;

const queryAllCategories = gql`  
query allCategories {
  allCategories {
    id
    name
  }
}
`;

const mutationToggleCourse = gql`
mutation($id: ID!, $done: Boolean) {
  updateCourse(
    id: $id
    done: $done
  ) {
    id
    done
  }
}
`;

const mutationCreateCourse = gql`
mutation($name: String!, $categoryId: ID) {
  createCourse(
    name: $name,
    categoryId: $categoryId
  ) {
    id,
    name,
    done,
    category {
      id
    }
  }
}
`;

const mutationDeleteCourse = gql`
mutation($id: ID!) {
  deleteCourse(id: $id) {
    id
  }
}
`;

@Injectable()
export class CourseProvider {

  constructor(private apollo: Apollo) { }

  getAllCourses(): Observable<any> {
    const queryWatcher = this.apollo.watchQuery<any>({
      query: queryAllCourses
    });

    return queryWatcher.valueChanges
      .map(result => result.data.allCourses);;
  }

  getAllCategories(): Observable<any> {
    const queryWatcher = this.apollo.watchQuery<any>({
      query: queryAllCategories
    });

    return queryWatcher.valueChanges
      .map(result => result.data.allCategories);
  }

  getCourses(category: any): Observable<any> {
    return this.getAllCourses()
      .map(data => data.filter(i => i.category && i.category.id == category.id));
  }

  toggleCourse(course: any): void {
    this.apollo.mutate({
      mutation: mutationToggleCourse,
      variables: {
        id: course.id,
        done: !course.done
      }
    })
      .subscribe(response => console.log(response.data),
      error => console.log('Mutation Error:', error));
  }

  createCourse(name, categoryId): void {
    this.apollo.mutate({
      mutation: mutationCreateCourse,
      variables: {
        name: name,
        categoryId: categoryId
      },
      update: (proxy, { data: { createCourse } }) => {

        // Read the data from the cache for the allCourses query
        const data: any = proxy.readQuery({ query: queryAllCourses });

        // Add the new course to the data
        data.allCourses.push(createCourse);

        // Write the data back to the cache for the allCourses query
        proxy.writeQuery({ query: queryAllCourses, data });
      }
    })
    .subscribe(response => console.log(response.data),
               error => console.log('Mutation Error:', error));
  }

  deleteCourse(course: any): void {
    this.apollo.mutate({
      mutation: mutationDeleteCourse,
      variables: {
        id: course.id
      },
      update: (proxy, { data: { deleteCourse } }) => {
        // Read the data from the cache for the allCourses query
        let data: any = proxy.readQuery({ query: queryAllCourses });

        // Remove the course from the data
        data.allCourses = data.allCourses.filter(i => i.id !== deleteCourse.id);

        // Write the data back to the cache for the allCourses query
        proxy.writeQuery({ query: queryAllCourses, data });
      }
    })
    .subscribe(response => console.log(response.data),
                error => console.log('Mutation Error:', error));
  }
}