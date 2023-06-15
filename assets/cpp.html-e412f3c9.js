const e=JSON.parse('{"key":"v-c9504c8e","path":"/posts/Interview/cpp.html","title":"c++面经","lang":"zh-CN","frontmatter":{"category":["面经"],"tag":["c++面经"],"description":"c++面经 c++基础 ++i和i++哪个效率更高？ 对于内建数据类型，效率没有区别。 对于自定义的数据类型， 前缀式(++i)可以返回对象的引用，而后缀式(i++)必须返回对象的值，存在复制开销。因此++i效率更高。 c++中const的作用 1.用于定义常量(注意修饰指针时的含义) 2.用于修饰函数形参 void func(const A&amp; a);","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Interview/cpp.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++面经"}],["meta",{"property":"og:description","content":"c++面经 c++基础 ++i和i++哪个效率更高？ 对于内建数据类型，效率没有区别。 对于自定义的数据类型， 前缀式(++i)可以返回对象的引用，而后缀式(i++)必须返回对象的值，存在复制开销。因此++i效率更高。 c++中const的作用 1.用于定义常量(注意修饰指针时的含义) 2.用于修饰函数形参 void func(const A&amp; a);"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-26T03:16:52.000Z"}],["meta",{"property":"article:tag","content":"c++面经"}],["meta",{"property":"article:modified_time","content":"2023-05-26T03:16:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++面经\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-26T03:16:52.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"c++基础","slug":"c-基础","link":"#c-基础","children":[{"level":3,"title":"++i和i++哪个效率更高？","slug":"i和i-哪个效率更高","link":"#i和i-哪个效率更高","children":[]},{"level":3,"title":"c++中const的作用","slug":"c-中const的作用","link":"#c-中const的作用","children":[]},{"level":3,"title":"如何禁用拷贝构造函数","slug":"如何禁用拷贝构造函数","link":"#如何禁用拷贝构造函数","children":[]}]},{"level":2,"title":"类和对象","slug":"类和对象","link":"#类和对象","children":[]},{"level":2,"title":"STL","slug":"stl","link":"#stl","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1683791573000,"updatedTime":1685071012000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":4}]},"readingTime":{"minutes":0.95,"words":286},"filePathRelative":"posts/Interview/cpp.md","localizedDate":"2023年5月11日","excerpt":"<h1> c++面经</h1>\\n<h2> c++基础</h2>\\n<h3> ++i和i++哪个效率更高？</h3>\\n<p>对于<strong>内建数据类型</strong>，效率没有区别。</p>\\n<p>对于<strong>自定义的数据类型</strong>， 前缀式(++i)可以返回对象的引用，而后缀式(i++)必须返回对象的值，存在复制开销。因此++i效率更高。</p>\\n<h3> c++中const的作用</h3>\\n<ul>\\n<li>1.用于定义常量(注意修饰指针时的含义)</li>\\n<li>2.用于修饰函数形参</li>\\n</ul>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">void</span> <span class=\\"token function\\">func</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> A<span class=\\"token operator\\">&amp;</span> a<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};