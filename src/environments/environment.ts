// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};

export const departmentUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/departments';

export const searchTermAndDepUrl = (theTerm: string, theDep: number) =>
  `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${theTerm}&departmentId=${theDep}`;

export const searchTermUrl = (theTerm: string) => `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${theTerm}`;

export const searchArtItemUrl = (id: number) => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;

// Folder from localhost - imitating seperate file system moved to frontApp for demonstration purposes
// export const localFileSystem = 'http://127.0.0.1:8887/';
export const localFileSystem = '/assets/localFileSystem/';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
