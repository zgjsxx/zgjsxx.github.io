const n=JSON.parse('{"key":"v-13fc9830","path":"/posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-22.html","title":"Item22 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["effective modern c++读书笔记"],"description":"Item22 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数 亲测，下面这种写法在gcc编译器上，不会报delete incomplete 的问题。 //widget.h #include &lt;memory&gt; class Widget { public: Widget(); private: struct Impl; std::unique_ptr&lt;Impl&gt; pImpl; }; #include &lt;string&gt; #include &lt;vector&gt; struct Widget::Impl { std::string name; std::vector&lt;double&gt; data; }; Widget::Widget() //根据条款21，通过std::make_unique : pImpl(std::make_unique&lt;Impl&gt;()) //来创建std::unique_ptr {} int main(){ Widget w; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-22.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Item22 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数"}],["meta",{"property":"og:description","content":"Item22 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数 亲测，下面这种写法在gcc编译器上，不会报delete incomplete 的问题。 //widget.h #include &lt;memory&gt; class Widget { public: Widget(); private: struct Impl; std::unique_ptr&lt;Impl&gt; pImpl; }; #include &lt;string&gt; #include &lt;vector&gt; struct Widget::Impl { std::string name; std::vector&lt;double&gt; data; }; Widget::Widget() //根据条款21，通过std::make_unique : pImpl(std::make_unique&lt;Impl&gt;()) //来创建std::unique_ptr {} int main(){ Widget w; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-07T02:19:52.000Z"}],["meta",{"property":"article:tag","content":"effective modern c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-09-07T02:19:52.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Item22 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-07T02:19:52.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1694053192000,"updatedTime":1694053192000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.36,"words":108},"filePathRelative":"posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-22.md","localizedDate":"2023年9月7日","excerpt":"<h1> Item22 当使用Pimpl惯用法，请在实现文件中定义特殊成员函数</h1>\\n<p>亲测，下面这种写法在gcc编译器上，不会报delete incomplete 的问题。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token comment\\">//widget.h</span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;memory&gt;</span></span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Widget</span> <span class=\\"token punctuation\\">{</span>                     \\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token function\\">Widget</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">private</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">Impl</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>unique_ptr<span class=\\"token operator\\">&lt;</span>Impl<span class=\\"token operator\\">&gt;</span> pImpl<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;string&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;vector&gt;</span></span>\\n\\n<span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">Widget</span><span class=\\"token operator\\">:</span><span class=\\"token base-clause\\"><span class=\\"token operator\\">:</span><span class=\\"token class-name\\">Impl</span></span> <span class=\\"token punctuation\\">{</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>string name<span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>vector<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">double</span><span class=\\"token operator\\">&gt;</span> data<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token class-name\\">Widget</span><span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">Widget</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>                    <span class=\\"token comment\\">//根据条款21，通过std::make_unique</span>\\n<span class=\\"token operator\\">:</span> <span class=\\"token function\\">pImpl</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token generic-function\\"><span class=\\"token function\\">make_unique</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>Impl<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span>   <span class=\\"token comment\\">//来创建std::unique_ptr</span>\\n<span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">{</span>\\n    Widget w<span class=\\"token punctuation\\">;</span>      \\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};