const e=JSON.parse('{"key":"v-391d4650","path":"/posts/Program_language/cpp/effective-cpp-42.html","title":"effective c++ 42-typename的双重含义","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 42-typename的双重含义 1.在用于声明template参数的时候，class和typename的含义是相同的 下面两种声明中，class和typename的含义是相同的。 template&lt;class T&gt; class Widget; // uses \\"class\\" template&lt;typename T&gt; class Widget; // uses \\"typename\\"","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp-42.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 42-typename的双重含义"}],["meta",{"property":"og:description","content":"effective c++ 42-typename的双重含义 1.在用于声明template参数的时候，class和typename的含义是相同的 下面两种声明中，class和typename的含义是相同的。 template&lt;class T&gt; class Widget; // uses \\"class\\" template&lt;typename T&gt; class Widget; // uses \\"typename\\""}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-06T07:28:38.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-06T07:28:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 42-typename的双重含义\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-06T07:28:38.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1.在用于声明template参数的时候，class和typename的含义是相同的","slug":"_1-在用于声明template参数的时候-class和typename的含义是相同的","link":"#_1-在用于声明template参数的时候-class和typename的含义是相同的","children":[]},{"level":2,"title":"2.typename必须作为嵌套从属类型名称的前缀词， 但是有两个例外","slug":"_2-typename必须作为嵌套从属类型名称的前缀词-但是有两个例外","link":"#_2-typename必须作为嵌套从属类型名称的前缀词-但是有两个例外","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1682391120000,"updatedTime":1683358118000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":1.26,"words":379},"filePathRelative":"posts/Program_language/cpp/effective-cpp-42.md","localizedDate":"2023年4月25日","excerpt":"<h1> effective c++ 42-typename的双重含义</h1>\\n<h2> 1.在用于声明template参数的时候，class和typename的含义是相同的</h2>\\n<p>下面两种声明中，<code>class</code>和<code>typename</code>的含义是相同的。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">template</span><span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">T</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Widget</span><span class=\\"token punctuation\\">;</span>                 <span class=\\"token comment\\">// uses \\"class\\"</span>\\n<span class=\\"token keyword\\">template</span><span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">T</span><span class=\\"token operator\\">&gt;</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Widget</span><span class=\\"token punctuation\\">;</span>              <span class=\\"token comment\\">// uses \\"typename\\"</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
