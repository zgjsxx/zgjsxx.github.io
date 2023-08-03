const e=JSON.parse('{"key":"v-1bae868b","path":"/posts/tool/git/git-merge-git-rebase.html","title":"git merge和git rebase有什么区别","lang":"zh-CN","frontmatter":{"category":["git"],"description":"git merge和git rebase有什么区别 git rebase和git merge是在日常开发中常用的用于分支合并的命令，也是非常容易误用的两个命令。本文将通过图文的方式去详解二者之间的区别。 git merge git merge会为本次的合并过程生成一条新的commit，并将该commit添加到目的分支上。通常用于将feature分支的内容向主分支进行合并。 如下图所示，在main分支的c2提交后checkout了一个新分支feature。随后feature分支上提交了c3，c5和c7三个提交。于此同时，main分支也在往前推进，产生了c4，c6，c8三个提交。此时由于feture分支已经开发完毕，向main分支进行合并，在解决完冲突之后，main分支上产生了一个新的提交c9。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/tool/git/git-merge-git-rebase.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"git merge和git rebase有什么区别"}],["meta",{"property":"og:description","content":"git merge和git rebase有什么区别 git rebase和git merge是在日常开发中常用的用于分支合并的命令，也是非常容易误用的两个命令。本文将通过图文的方式去详解二者之间的区别。 git merge git merge会为本次的合并过程生成一条新的commit，并将该commit添加到目的分支上。通常用于将feature分支的内容向主分支进行合并。 如下图所示，在main分支的c2提交后checkout了一个新分支feature。随后feature分支上提交了c3，c5和c7三个提交。于此同时，main分支也在往前推进，产生了c4，c6，c8三个提交。此时由于feture分支已经开发完毕，向main分支进行合并，在解决完冲突之后，main分支上产生了一个新的提交c9。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-03T08:36:59.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-03T08:36:59.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"git merge和git rebase有什么区别\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-08-03T08:36:59.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"git merge","slug":"git-merge","link":"#git-merge","children":[]},{"level":2,"title":"git rebase","slug":"git-rebase","link":"#git-rebase","children":[]},{"level":2,"title":"在线实验","slug":"在线实验","link":"#在线实验","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1691051819000,"updatedTime":1691051819000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":3.23,"words":968},"filePathRelative":"posts/tool/git/git-merge-git-rebase.md","localizedDate":"2023年8月3日","excerpt":"<h1> git merge和git rebase有什么区别</h1>\\n<p><code>git rebase</code>和<code>git merge</code>是在日常开发中常用的用于分支合并的命令，也是非常容易误用的两个命令。本文将通过图文的方式去详解二者之间的区别。</p>\\n<h2> git merge</h2>\\n<p><code>git merge</code>会为本次的合并过程生成一条新的commit，并将该commit添加到目的分支上。通常用于将<strong>feature分支的内容向主分支</strong>进行合并。</p>\\n<p>如下图所示，在main分支的c2提交后checkout了一个新分支feature。随后feature分支上提交了c3，c5和c7三个提交。于此同时，main分支也在往前推进，产生了c4，c6，c8三个提交。此时由于feture分支已经开发完毕，向main分支进行合并，在解决完冲突之后，main分支上产生了一个新的提交c9。</p>","autoDesc":true}');export{e as data};
