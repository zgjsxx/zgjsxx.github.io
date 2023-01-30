const e=JSON.parse('{"key":"v-06f47143","path":"/posts/tool/how-to-configure-git-with-multiple-user.html","title":"如何配置git，使其支持多用户？","lang":"zh-CN","frontmatter":{"category":["git"],"description":"如何配置git，使其支持多用户？ 在多数时候， 我们使用git进行操作时，只需要在本地配置一个用户的ssh key，就可以完成基本的pull/push操作。如果现在我有两个github的账号，并需要在一台电脑中操作其中的repo，有没有什么较好的办法呢？ 下面就将详解其配置过程。 清除全局用户配置 该步骤是必须的， 在本地设置多账户之后， 就不再使用全局的用户名和email了， 因此需要先unset掉global的用户名和邮箱。 git config --global --unset user.name git config --global --unset user.email","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/tool/how-to-configure-git-with-multiple-user.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"如何配置git，使其支持多用户？"}],["meta",{"property":"og:description","content":"如何配置git，使其支持多用户？ 在多数时候， 我们使用git进行操作时，只需要在本地配置一个用户的ssh key，就可以完成基本的pull/push操作。如果现在我有两个github的账号，并需要在一台电脑中操作其中的repo，有没有什么较好的办法呢？ 下面就将详解其配置过程。 清除全局用户配置 该步骤是必须的， 在本地设置多账户之后， 就不再使用全局的用户名和email了， 因此需要先unset掉global的用户名和邮箱。 git config --global --unset user.name git config --global --unset user.email"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-01-17T14:42:57.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-17T14:42:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如何配置git，使其支持多用户？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-01-17T14:42:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"清除全局用户配置","slug":"清除全局用户配置","link":"#清除全局用户配置","children":[]},{"level":2,"title":"生成每个用户的密钥对","slug":"生成每个用户的密钥对","link":"#生成每个用户的密钥对","children":[]},{"level":2,"title":"在github Web console中添加SSH Keys","slug":"在github-web-console中添加ssh-keys","link":"#在github-web-console中添加ssh-keys","children":[]},{"level":2,"title":"管理密钥","slug":"管理密钥","link":"#管理密钥","children":[]},{"level":2,"title":"克隆仓库进行push","slug":"克隆仓库进行push","link":"#克隆仓库进行push","children":[]}],"git":{"createdTime":1673966577000,"updatedTime":1673966577000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":3.36,"words":1007},"filePathRelative":"posts/tool/how-to-configure-git-with-multiple-user.md","localizedDate":"2023年1月17日","excerpt":"<h1> 如何配置git，使其支持多用户？</h1>\\n<p>在多数时候， 我们使用git进行操作时，只需要在本地配置一个用户的ssh key，就可以完成基本的pull/push操作。如果现在我有两个github的账号，并需要在一台电脑中操作其中的repo，有没有什么较好的办法呢？</p>\\n<p>下面就将详解其配置过程。</p>\\n<h2> 清除全局用户配置</h2>\\n<p>该步骤是必须的， 在本地设置多账户之后， 就不再使用全局的用户名和email了， 因此需要先unset掉global的用户名和邮箱。</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token function\\">git</span> config <span class=\\"token parameter variable\\">--global</span> <span class=\\"token parameter variable\\">--unset</span> user.name\\n<span class=\\"token function\\">git</span> config <span class=\\"token parameter variable\\">--global</span> <span class=\\"token parameter variable\\">--unset</span> user.email\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};