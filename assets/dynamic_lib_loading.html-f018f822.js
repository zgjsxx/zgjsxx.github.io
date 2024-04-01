const e=JSON.parse('{"key":"v-5ee46830","path":"/posts/compile/dynamic_lib_loading.html","title":"动态链接库的加载(翻译)","lang":"zh-CN","frontmatter":{"category":["Linux","ELF文件","动态库"],"description":"动态链接库的加载(翻译) 什么是动态库 library（函数库）是一个包含编译后的代码和数据的文件。 library大多情况下是非常有用的，因为它们可以让编译过程更加的快速，因为你不必每次编译所有依赖的文件，这使得我们可以进行模块化开发。静态库可以被链接到一个已经编译好的可执行文件中或者其他库中，在编译之后，静态库中的内容就被嵌入到了可执行文件或者其他库当中。动态库则是可执行文件在运行时刻才被加载的，这意味着这样的过程将会更加的复杂。 搭建demo 为了更好的探索动态链接库，我们使用一个例子贯穿整文。 我们以三个源文件开始。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/compile/dynamic_lib_loading.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"动态链接库的加载(翻译)"}],["meta",{"property":"og:description","content":"动态链接库的加载(翻译) 什么是动态库 library（函数库）是一个包含编译后的代码和数据的文件。 library大多情况下是非常有用的，因为它们可以让编译过程更加的快速，因为你不必每次编译所有依赖的文件，这使得我们可以进行模块化开发。静态库可以被链接到一个已经编译好的可执行文件中或者其他库中，在编译之后，静态库中的内容就被嵌入到了可执行文件或者其他库当中。动态库则是可执行文件在运行时刻才被加载的，这意味着这样的过程将会更加的复杂。 搭建demo 为了更好的探索动态链接库，我们使用一个例子贯穿整文。 我们以三个源文件开始。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-01T07:00:42.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-01T07:00:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"动态链接库的加载(翻译)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-01T07:00:42.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是动态库","slug":"什么是动态库","link":"#什么是动态库","children":[]},{"level":2,"title":"搭建demo","slug":"搭建demo","link":"#搭建demo","children":[]},{"level":2,"title":"编译动态库","slug":"编译动态库","link":"#编译动态库","children":[]},{"level":2,"title":"编译可执行文件使用动态库","slug":"编译可执行文件使用动态库","link":"#编译可执行文件使用动态库","children":[]},{"level":2,"title":"ELF - 可执行和可链接格式","slug":"elf-可执行和可链接格式","link":"#elf-可执行和可链接格式","children":[]},{"level":2,"title":"直接依赖","slug":"直接依赖","link":"#直接依赖","children":[]},{"level":2,"title":"运行时搜索路径","slug":"运行时搜索路径","link":"#运行时搜索路径","children":[]},{"level":2,"title":"修复我们的可执行文件","slug":"修复我们的可执行文件","link":"#修复我们的可执行文件","children":[]},{"level":2,"title":"rpath和runpath","slug":"rpath和runpath","link":"#rpath和runpath","children":[]},{"level":2,"title":"$ORIGIN","slug":"origin","link":"#origin","children":[]},{"level":2,"title":"运行时搜索路径：安全性","slug":"运行时搜索路径-安全性","link":"#运行时搜索路径-安全性","children":[]},{"level":2,"title":"调试备忘录","slug":"调试备忘录","link":"#调试备忘录","children":[]}],"git":{"createdTime":1711954842000,"updatedTime":1711954842000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":15.37,"words":4610},"filePathRelative":"posts/compile/dynamic_lib_loading.md","localizedDate":"2024年4月1日","excerpt":"<h1> 动态链接库的加载(翻译)</h1>\\n<h2> 什么是动态库</h2>\\n<p>library（函数库）是一个包含编译后的代码和数据的文件。 library大多情况下是非常有用的，因为它们可以让编译过程更加的快速，因为你不必每次编译所有依赖的文件，这使得我们可以进行模块化开发。静态库可以被链接到一个已经编译好的可执行文件中或者其他库中，在编译之后，静态库中的内容就被嵌入到了可执行文件或者其他库当中。动态库则是可执行文件在<strong>运行时刻</strong>才被加载的，这意味着这样的过程将会更加的复杂。</p>\\n<h2> 搭建demo</h2>\\n<p>为了更好的探索动态链接库，我们使用一个例子贯穿整文。 我们以三个源文件开始。</p>","autoDesc":true}');export{e as data};
