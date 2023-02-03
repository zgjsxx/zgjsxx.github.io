const e=JSON.parse('{"key":"v-af356648","path":"/posts/tool/makefile-knowledge.html","title":"makefile简介","lang":"zh-CN","frontmatter":{"category":["Linux","Makefile"],"description":"makefile简介 很多时候， 我们在git clone完一个project之后，就会让我们使用make命令进行项目的构建。这个make命令的背后就是按照了Makefile文件定义的格式去完成项目构建。 因此Makefile的作用就是帮助程序员进行项目的构建，它按照项目的需求个性化的定义自己的构建过程。Makefile并不限定编程语言，但是在c/c++项目中使用相对较多。其他的一些构建工具，例如qmake，也是将*.pro文件转化为Makefile，再进行构建。 可以看出Makefile的应用面还是非常广泛的， 下面将一步一步的讲解Makefile最常使用的语法， 并通过案例进行实践， 一步一步深入Makefile， 本文的案例主要使用了C++语言。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/tool/makefile-knowledge.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"makefile简介"}],["meta",{"property":"og:description","content":"makefile简介 很多时候， 我们在git clone完一个project之后，就会让我们使用make命令进行项目的构建。这个make命令的背后就是按照了Makefile文件定义的格式去完成项目构建。 因此Makefile的作用就是帮助程序员进行项目的构建，它按照项目的需求个性化的定义自己的构建过程。Makefile并不限定编程语言，但是在c/c++项目中使用相对较多。其他的一些构建工具，例如qmake，也是将*.pro文件转化为Makefile，再进行构建。 可以看出Makefile的应用面还是非常广泛的， 下面将一步一步的讲解Makefile最常使用的语法， 并通过案例进行实践， 一步一步深入Makefile， 本文的案例主要使用了C++语言。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-03T06:51:19.000Z"}],["meta",{"property":"article:modified_time","content":"2023-02-03T06:51:19.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"makefile简介\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-03T06:51:19.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"makefile的基本规则","slug":"makefile的基本规则","link":"#makefile的基本规则","children":[]},{"level":2,"title":"demo1：第一个Makefile","slug":"demo1-第一个makefile","link":"#demo1-第一个makefile","children":[]},{"level":2,"title":"使用$@ $< $^符号简化编写","slug":"使用-符号简化编写","link":"#使用-符号简化编写","children":[]},{"level":2,"title":"demo2：使用$@ $< $^ 简化书写","slug":"demo2-使用-简化书写","link":"#demo2-使用-简化书写","children":[]},{"level":2,"title":"vpath和VPATH","slug":"vpath和vpath","link":"#vpath和vpath","children":[]},{"level":2,"title":"demo3：使用vpath和VPATH指定依赖文件搜索路径","slug":"demo3-使用vpath和vpath指定依赖文件搜索路径","link":"#demo3-使用vpath和vpath指定依赖文件搜索路径","children":[]},{"level":2,"title":"使用内置函数wildcard，patsubst， foreach， notdir等函数帮助我们构建","slug":"使用内置函数wildcard-patsubst-foreach-notdir等函数帮助我们构建","link":"#使用内置函数wildcard-patsubst-foreach-notdir等函数帮助我们构建","children":[]},{"level":2,"title":"静态模式","slug":"静态模式","link":"#静态模式","children":[]},{"level":2,"title":"makefile自动生成依赖","slug":"makefile自动生成依赖","link":"#makefile自动生成依赖","children":[]},{"level":2,"title":"伪目标","slug":"伪目标","link":"#伪目标","children":[]},{"level":2,"title":"demo4: 一个综合案列使用内置函数+静态模式+自动生成依赖","slug":"demo4-一个综合案列使用内置函数-静态模式-自动生成依赖","link":"#demo4-一个综合案列使用内置函数-静态模式-自动生成依赖","children":[]}],"git":{"createdTime":1675063769000,"updatedTime":1675407079000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":10},{"name":"zgjsxx","email":"codebuildingx@163.com","commits":1}]},"readingTime":{"minutes":14.3,"words":4290},"filePathRelative":"posts/tool/makefile-knowledge.md","localizedDate":"2023年1月30日","excerpt":"<h1> makefile简介</h1>\\n<p>很多时候， 我们在<code>git clone</code>完一个project之后，就会让我们使用<code>make</code>命令进行项目的构建。这个make命令的背后就是按照了Makefile文件定义的格式去完成项目构建。</p>\\n<p>因此Makefile的作用就是帮助程序员进行项目的构建，它按照项目的需求个性化的定义自己的构建过程。Makefile并不限定编程语言，但是在c/c++项目中使用相对较多。其他的一些构建工具，例如qmake，也是将*.pro文件转化为Makefile，再进行构建。</p>\\n<p>可以看出Makefile的应用面还是非常广泛的， 下面将一步一步的讲解Makefile最常使用的语法， 并通过案例进行实践， 一步一步深入Makefile， 本文的案例主要使用了C++语言。</p>","autoDesc":true}');export{e as data};
