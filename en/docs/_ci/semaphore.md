[Semaphore](https://semaphoreci.com/) has Yarn pre-installed for all
supported Node.js versions, and no user interaction is required for the Yarn
cache to work.

To assure that your local Yarn version matches the one on Semaphore, add the
line below to your setup commands, in Project Settings.

```sh
npm install -g yarn@<version>
```
