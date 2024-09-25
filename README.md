# Repro for issue 7728

## Versions

firebase-tools: v13.19.0<br>
firebase-functions: v5.0.1<br>

## Steps to reproduce

1. Run `cd functions`
2. Run `npm i`
3. Run `npm i firebase-functions@5.0.1`
4. Run `firebase deploy --project PROJECT_ID`
   - Errors with:

```
=== Deploying to 'PROJECT_ID'...

i  deploying functions
i  functions: preparing codebase default for deployment
i  functions: ensuring required API cloudfunctions.googleapis.com is enabled...
i  functions: ensuring required API cloudbuild.googleapis.com is enabled...
i  artifactregistry: ensuring required API artifactregistry.googleapis.com is enabled...
✔  artifactregistry: required API artifactregistry.googleapis.com is enabled
✔  functions: required API cloudbuild.googleapis.com is enabled
✔  functions: required API cloudfunctions.googleapis.com is enabled
⚠  functions: package.json indicates an outdated version of firebase-functions. Please upgrade using npm install --save firebase-functions@latest in your functions directory.
⚠  functions: Please note that there will be breaking changes when you upgrade.
i  functions: Loading and analyzing source code for codebase default to determine what to deploy
⚠  functions: You are using an old version of firebase-functions SDK (5.0.1). Please update firebase-functions SDK to >=5.1.0
i  functions: preparing functions directory for uploading...
i  functions: packaged /Users/<PATH>/issues/7728/functions (61.66 KB) for uploading
i  functions: ensuring required API run.googleapis.com is enabled...
i  functions: ensuring required API eventarc.googleapis.com is enabled...
i  functions: ensuring required API pubsub.googleapis.com is enabled...
i  functions: ensuring required API storage.googleapis.com is enabled...
✔  functions: required API pubsub.googleapis.com is enabled
✔  functions: required API run.googleapis.com is enabled
✔  functions: required API eventarc.googleapis.com is enabled
✔  functions: required API storage.googleapis.com is enabled
i  functions: generating the service identity for pubsub.googleapis.com...
i  functions: generating the service identity for eventarc.googleapis.com...
Error: Failed to validate secret versions:
- FirebaseError HTTP Error: 400, The provided Secret ID [projects/PROJECT_ID/secrets/[object Object]/versions/latest] does not match the expected format [projects/*/secrets/*/versions/*]
- FirebaseError HTTP Error: 400, The provided Secret ID [projects/PROJECT_ID/secrets/[object Object]/versions/latest] does not match the expected format [projects/*/secrets/*/versions/*]
```

## Notes

It looks like updating to firebase-functions >= 5.1.0 resolves the issue.

Using:

- firebase-tools v13.19.0
- firebase-functions v5.1.0

1. Run `cd functions`
2. Run `npm i firebase-functions@5.1.0`
3. Run `firebase deploy --project PROJECT_ID`
   - Deployment completes with:

```
=== Deploying to 'PROJECT_ID-testproj'...

i  deploying functions
i  functions: preparing codebase default for deployment
i  functions: ensuring required API cloudfunctions.googleapis.com is enabled...
i  functions: ensuring required API cloudbuild.googleapis.com is enabled...
i  artifactregistry: ensuring required API artifactregistry.googleapis.com is enabled...
✔  functions: required API cloudbuild.googleapis.com is enabled
✔  functions: required API cloudfunctions.googleapis.com is enabled
✔  artifactregistry: required API artifactregistry.googleapis.com is enabled
⚠  functions: package.json indicates an outdated version of firebase-functions. Please upgrade using npm install --save firebase-functions@latest in your functions directory.
⚠  functions: Please note that there will be breaking changes when you upgrade.
i  functions: Loading and analyzing source code for codebase default to determine what to deploy
Serving at port 8950

i  extensions: ensuring required API firebaseextensions.googleapis.com is enabled...
✔  extensions: required API firebaseextensions.googleapis.com is enabled
i  functions: preparing functions directory for uploading...
i  functions: packaged /Users/<PATH>/issues/7728/functions (61.68 KB) for uploading
i  functions: ensuring required API run.googleapis.com is enabled...
i  functions: ensuring required API eventarc.googleapis.com is enabled...
i  functions: ensuring required API pubsub.googleapis.com is enabled...
i  functions: ensuring required API storage.googleapis.com is enabled...
✔  functions: required API run.googleapis.com is enabled
✔  functions: required API storage.googleapis.com is enabled
✔  functions: required API eventarc.googleapis.com is enabled
✔  functions: required API pubsub.googleapis.com is enabled
i  functions: generating the service identity for pubsub.googleapis.com...
i  functions: generating the service identity for eventarc.googleapis.com...
i  functions: ensuring 769244627687-compute@developer.gserviceaccount.com access to secret API_KEY.
i  functions: ensuring 769244627687-compute@developer.gserviceaccount.com access to secret API_KEY_2.
✔  secretmanager: Granted roles/secretmanager.secretAccessor on projects/PROJECT_ID-testproj/secrets/API_KEY_2 to 769244627687-compute@developer.gserviceaccount.com
✔  functions: ensured 769244627687-compute@developer.gserviceaccount.com access to API_KEY_2.
✔  secretmanager: Granted roles/secretmanager.secretAccessor on projects/PROJECT_ID-testproj/secrets/API_KEY to 769244627687-compute@developer.gserviceaccount.com
✔  functions: ensured 769244627687-compute@developer.gserviceaccount.com access to API_KEY.
✔  functions: functions folder uploaded successfully
i  functions: creating Node.js 18 (2nd Gen) function helloSecret(us-central1)...
✔  functions[helloSecret(us-central1)] Successful create operation.
Function URL (helloSecret(us-central1)): https://hellosecret-3zmjtgoueq-uc.a.run.app
i  functions: cleaning up build files...

✔  Deploy complete!
```
