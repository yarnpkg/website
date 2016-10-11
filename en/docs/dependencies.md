---
id: docs_dependencies
guide: docs_dependencies
layout: guide
additional_reading_tags: ["package-json", "yarn-lock"]
---

Package dependencies are critical to the success of a package. When you develop the functionality of your package, you will very likely use existing code defined in other packages. Those packages then become dependencies to your project.

Your `package.json` file is the home for the declaration of all your dependencies, from development to production to optional. You will specify both the package name and minimum version information for each dependency.

Your `yarn.lock` file ensures that your package is consistent across installations by storing the versions of which dependencies are installed with your package.  
