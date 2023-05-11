const e=JSON.parse('{"key":"v-e7958534","path":"/posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-02.html","title":"Item2：理解auto类型推导","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["effective modern c++读书笔记"],"description":"Item2：理解auto类型推导 本文主要讨论c++中的auto类型推导过程。 auto的类型推导和item1中模板的推导过程是很相似的，只有很少的点是不同的，下面一一说来。 当一个变量使用auto进行声明时，auto扮演了模板中T的角色，变量的类型说明符扮演了ParamType的角色。考虑这个例子： auto x = 27;","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-02.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Item2：理解auto类型推导"}],["meta",{"property":"og:description","content":"Item2：理解auto类型推导 本文主要讨论c++中的auto类型推导过程。 auto的类型推导和item1中模板的推导过程是很相似的，只有很少的点是不同的，下面一一说来。 当一个变量使用auto进行声明时，auto扮演了模板中T的角色，变量的类型说明符扮演了ParamType的角色。考虑这个例子： auto x = 27;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T07:03:43.000Z"}],["meta",{"property":"article:tag","content":"effective modern c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-11T07:03:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Item2：理解auto类型推导\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T07:03:43.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1683788623000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":7.44,"words":2232},"filePathRelative":"posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-02.md","localizedDate":"2023年5月11日","excerpt":"<h1> Item2：理解auto类型推导</h1>\\n<p>本文主要讨论c++中的auto类型推导过程。</p>\\n<p>auto的类型推导和item1中模板的推导过程是很相似的，只有很少的点是不同的，下面一一说来。</p>\\n<p>当一个变量使用auto进行声明时，auto扮演了模板中T的角色，变量的类型说明符扮演了ParamType的角色。考虑这个例子：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">auto</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">27</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
