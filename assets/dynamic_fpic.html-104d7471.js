const n=JSON.parse('{"key":"v-6461b009","path":"/posts/Linux/compile/dynamic_fpic.html","title":"地址无关代码fPIC","lang":"zh-CN","frontmatter":{"category":["编译原理","Linux","ELF文件"],"description":"地址无关代码fPIC 1.模块内部的函数调用、跳转 2.模块内部的数据访问，例如本模块中定义的全局变量 3.模块外部的函数调用、跳转 4.模块外部的数据访问，例如访问其他模块中定义的全局变量 static int a; extern int b; extern void ext(); void bar() { a = 1;//类型2 b = 2;//类型4 } void foo() { bar()；//类型1 ext(); //类型3 }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/compile/dynamic_fpic.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"地址无关代码fPIC"}],["meta",{"property":"og:description","content":"地址无关代码fPIC 1.模块内部的函数调用、跳转 2.模块内部的数据访问，例如本模块中定义的全局变量 3.模块外部的函数调用、跳转 4.模块外部的数据访问，例如访问其他模块中定义的全局变量 static int a; extern int b; extern void ext(); void bar() { a = 1;//类型2 b = 2;//类型4 } void foo() { bar()；//类型1 ext(); //类型3 }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-21T10:08:58.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-21T10:08:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"地址无关代码fPIC\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-21T10:08:58.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"类型1 模块内部调用或跳转","slug":"类型1-模块内部调用或跳转","link":"#类型1-模块内部调用或跳转","children":[]},{"level":2,"title":"类型二 模块内部的数据访问","slug":"类型二-模块内部的数据访问","link":"#类型二-模块内部的数据访问","children":[]},{"level":2,"title":".interp段","slug":"interp段","link":"#interp段","children":[]},{"level":2,"title":"objdump 和 readelf 的常用命令","slug":"objdump-和-readelf-的常用命令","link":"#objdump-和-readelf-的常用命令","children":[]}],"git":{"createdTime":1708415566000,"updatedTime":1708510138000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":8}]},"readingTime":{"minutes":3.79,"words":1138},"filePathRelative":"posts/Linux/compile/dynamic_fpic.md","localizedDate":"2024年2月20日","excerpt":"<h1> 地址无关代码fPIC</h1>\\n<ul>\\n<li>1.模块内部的函数调用、跳转</li>\\n<li>2.模块内部的数据访问，例如本模块中定义的全局变量</li>\\n<li>3.模块外部的函数调用、跳转</li>\\n<li>4.模块外部的数据访问，例如访问其他模块中定义的全局变量</li>\\n</ul>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">int</span> a<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">extern</span> <span class=\\"token keyword\\">int</span> b<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">extern</span> <span class=\\"token keyword\\">void</span> <span class=\\"token function\\">ext</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    a <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//类型2</span>\\n    b <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//类型4</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>；<span class=\\"token comment\\">//类型1</span>\\n    <span class=\\"token function\\">ext</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">//类型3</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
