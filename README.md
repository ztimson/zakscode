<!-- Header -->
<div id="top" align="center">
  <br />

  <!-- Logo -->
  <img src="./public/logo.png" alt="Logo" width="200" height="200">

  <!-- Title -->
  ### ZaksCode

  <!-- Description -->
  Source Code for ZaksCode Website

  <!-- Repo badges -->
  [![Version](https://img.shields.io/badge/dynamic/json.svg?label=Version&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/zakscode/tags&query=$[0].name)](https://git.zakscode.com/ztimson/zakscode/tags)
  [![Pull Requests](https://img.shields.io/badge/dynamic/json.svg?label=Pull%20Requests&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/zakscode&query=open_pr_counter)](https://git.zakscode.com/ztimson/zakscode/pulls)
  [![Issues](https://img.shields.io/badge/dynamic/json.svg?label=Issues&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/zakscode&query=open_issues_count)](https://git.zakscode.com/ztimson/zakscode/issues)

  <!-- Links -->

  ---
  <div>
    <a href="https://git.zakscode.com/ztimson/zakscode/releases" target="_blank">Release Notes</a>
    • <a href="https://git.zakscode.com/ztimson/zakscode/issues/new?template=.github%2fissue_template%2fbug.md" target="_blank">Report a Bug</a>
    • <a href="https://git.zakscode.com/ztimson/zakscode/issues/new?template=.github%2fissue_template%2fenhancement.md" target="_blank">Request a Feature</a>
  </div>

  ---
</div>

## Table of Contents
- [ZaksCode](#top)
	- [About](#about)
		- [Demo](#demo)
		- [Built With](#built-with)
	- [Setup](#setup)
		- [Production](#production)
		- [Development](#development)
	- [License](#license)

## About

This the source code for `zakscode.com`.

ZaksCode is the personal website of Zakary Timson & is used as his business page & portfolio.
### Demo

Website: https://zakscode.com

### Built With
[![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs)](https://vuejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![Docker](https://img.shields.io/badge/Docker-384d54?style=for-the-badge&logo=docker)](https://docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

## Setup

<details>
<summary>
  <h3 id="production" style="display: inline">
    Production
  </h3>
</summary>

#### Prerequisites
- [Docker](https://docs.docker.com/install/)

#### Instructions
1. Run the docker image: `docker run -p 80:80 git.zakscode.com/ztimson/zakscode:latest`
2. Open [http://localhost](http://localhost)
</details>

<details>
<summary>
  <h3 id="development" style="display: inline">
    Development
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install the dependencies: `npm install`
2. Start the dev server: `npm run start`
3. Open [http://localhost:4200](http://localhost:5173)

</details>

## License
Copyright © 2023 Zakary Timson | All Rights Reserved

See the [license](./LICENSE) for more information.
