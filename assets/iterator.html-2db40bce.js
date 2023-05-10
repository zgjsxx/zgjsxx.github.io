const t=JSON.parse('{"key":"v-22834b21","path":"/posts/open_source_project/MyTinySTL/iterator.html","title":"迭代器","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","MyTinySTL"],"description":"迭代器 萃取器 萃取器的作用是在编译器获取一个迭代器的类型。其有三个版本。 第一个版本就是最common的场景，Iterator是一个class类型的type， 例如list类型。 // 萃取迭代器的特性 template &lt;class Iterator&gt; struct iterator_traits : public iterator_traits_helper&lt;Iterator, has_iterator_cat&lt;Iterator&gt;::value&gt; {};","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/open_source_project/MyTinySTL/iterator.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"迭代器"}],["meta",{"property":"og:description","content":"迭代器 萃取器 萃取器的作用是在编译器获取一个迭代器的类型。其有三个版本。 第一个版本就是最common的场景，Iterator是一个class类型的type， 例如list类型。 // 萃取迭代器的特性 template &lt;class Iterator&gt; struct iterator_traits : public iterator_traits_helper&lt;Iterator, has_iterator_cat&lt;Iterator&gt;::value&gt; {};"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-10T05:30:11.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"MyTinySTL"}],["meta",{"property":"article:modified_time","content":"2023-05-10T05:30:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"迭代器\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-10T05:30:11.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"萃取器","slug":"萃取器","link":"#萃取器","children":[]},{"level":2,"title":"has_iterator_cat","slug":"has-iterator-cat","link":"#has-iterator-cat","children":[]},{"level":2,"title":"iterator_traits_helper","slug":"iterator-traits-helper","link":"#iterator-traits-helper","children":[]},{"level":2,"title":"iterator_traits_impl","slug":"iterator-traits-impl","link":"#iterator-traits-impl","children":[]},{"level":2,"title":"参考文章","slug":"参考文章","link":"#参考文章","children":[]}],"git":{"createdTime":1682322735000,"updatedTime":1683696611000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":3.17,"words":952},"filePathRelative":"posts/open_source_project/MyTinySTL/iterator.md","localizedDate":"2023年4月24日","excerpt":"<h1> 迭代器</h1>\\n<h2> 萃取器</h2>\\n<p>萃取器的作用是在编译器获取一个迭代器的类型。其有三个版本。</p>\\n<p>第一个版本就是最common的场景，Iterator是一个class类型的type， 例如list类型。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token comment\\">// 萃取迭代器的特性</span>\\n<span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Iterator</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">iterator_traits</span> \\n  <span class=\\"token operator\\">:</span> <span class=\\"token base-clause\\"><span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">iterator_traits_helper</span><span class=\\"token operator\\">&lt;</span><span class=\\"token class-name\\">Iterator</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">has_iterator_cat</span><span class=\\"token operator\\">&lt;</span><span class=\\"token class-name\\">Iterator</span><span class=\\"token operator\\">&gt;</span><span class=\\"token double-colon punctuation\\">::</span><span class=\\"token class-name\\">value</span><span class=\\"token operator\\">&gt;</span></span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};
