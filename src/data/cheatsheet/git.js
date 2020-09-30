const itemsGeneral = [
  [`git pull`, `Update local repository with master branch`],
  [`git init`, `Creates new repository`],
  [`git clone`, `Clone a repository into current working directory`],
  [`git add <filename>`, ``],
  [`git commit –m "message describing commit"`, ``],
  [`git commit -a`, `Commits all edits`],
  [`git push origin master`, `send master branch to remote repository`],
]

const cheatsheetGit = {
  name: `git`,
  language: `bash`,
  sections: [
    {
      heading: `General`,
      items: () => {
        for (const x of itemsGeneral) {
          return {
            cmd: x[0],
            txt: x[1],
          }
        }
      },
    },
  ],
}

module.exports = cheatsheetGit
