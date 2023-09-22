const n=JSON.parse('{"key":"v-47df4fec","path":"/posts/Program_language/cpp/cpp_special_function.html","title":"深入理解c++特殊成员函数","lang":"zh-CN","frontmatter":{"category":["C++"],"description":"深入理解c++特殊成员函数 在c++中，特殊成员函数有下面6个： 构造函数 析构函数 复制构造函数(拷贝构造函数) 赋值运算符(拷贝运算符) 移动构造函数(c++11引入) 移动运算符(c++11引入) 以Widget类为例，其特殊成员函数的签名如下所示： class Widget{ public: Widget();//构造函数 ~Widget();//析构函数 Widget(const Widget&amp; rhs);//复制构造函数(拷贝构造函数) Widget&amp; operator=(const Widget&amp; rhs);//赋值运算符(拷贝运算符) Widget(Widget&amp;&amp; rhs);//移动构造函数 Widget&amp; operator=(Widget&amp;&amp; rhs);//移动运算符 }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_special_function.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"深入理解c++特殊成员函数"}],["meta",{"property":"og:description","content":"深入理解c++特殊成员函数 在c++中，特殊成员函数有下面6个： 构造函数 析构函数 复制构造函数(拷贝构造函数) 赋值运算符(拷贝运算符) 移动构造函数(c++11引入) 移动运算符(c++11引入) 以Widget类为例，其特殊成员函数的签名如下所示： class Widget{ public: Widget();//构造函数 ~Widget();//析构函数 Widget(const Widget&amp; rhs);//复制构造函数(拷贝构造函数) Widget&amp; operator=(const Widget&amp; rhs);//赋值运算符(拷贝运算符) Widget(Widget&amp;&amp; rhs);//移动构造函数 Widget&amp; operator=(Widget&amp;&amp; rhs);//移动运算符 }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-07T02:16:53.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-07T02:16:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入理解c++特殊成员函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-07T02:16:53.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"构造函数","slug":"构造函数","link":"#构造函数","children":[]},{"level":2,"title":"析构函数","slug":"析构函数","link":"#析构函数","children":[]},{"level":2,"title":"复制构造函数和赋值运算符","slug":"复制构造函数和赋值运算符","link":"#复制构造函数和赋值运算符","children":[]},{"level":2,"title":"移动构造函数和移动运算符","slug":"移动构造函数和移动运算符","link":"#移动构造函数和移动运算符","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1693233959000,"updatedTime":1694053013000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":8}]},"readingTime":{"minutes":18.91,"words":5673},"filePathRelative":"posts/Program_language/cpp/cpp_special_function.md","localizedDate":"2023年8月28日","excerpt":"<h1> 深入理解c++特殊成员函数</h1>\\n<p>在c++中，特殊成员函数有下面6个：</p>\\n<ul>\\n<li>构造函数</li>\\n<li>析构函数</li>\\n<li>复制构造函数(拷贝构造函数)</li>\\n<li>赋值运算符(拷贝运算符)</li>\\n<li>移动构造函数(c++11引入)</li>\\n<li>移动运算符(c++11引入)</li>\\n</ul>\\n<p>以Widget类为例，其特殊成员函数的签名如下所示：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Widget</span><span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token function\\">Widget</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//构造函数</span>\\n    <span class=\\"token operator\\">~</span><span class=\\"token function\\">Widget</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//析构函数</span>\\n    <span class=\\"token function\\">Widget</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> Widget<span class=\\"token operator\\">&amp;</span> rhs<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//复制构造函数(拷贝构造函数)</span>\\n    Widget<span class=\\"token operator\\">&amp;</span> <span class=\\"token keyword\\">operator</span><span class=\\"token operator\\">=</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> Widget<span class=\\"token operator\\">&amp;</span> rhs<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//赋值运算符(拷贝运算符)</span>\\n    <span class=\\"token function\\">Widget</span><span class=\\"token punctuation\\">(</span>Widget<span class=\\"token operator\\">&amp;&amp;</span> rhs<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//移动构造函数</span>\\n    Widget<span class=\\"token operator\\">&amp;</span> <span class=\\"token keyword\\">operator</span><span class=\\"token operator\\">=</span><span class=\\"token punctuation\\">(</span>Widget<span class=\\"token operator\\">&amp;&amp;</span> rhs<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//移动运算符</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};