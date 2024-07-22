import{_ as a,V as e,W as t,X as n,Y as p,$ as o,a0 as c,F as l}from"./framework-9a29aaa0.js";const i={},r=c(`<h1 id="c-面经" tabindex="-1"><a class="header-anchor" href="#c-面经" aria-hidden="true">#</a> c++面经</h1><h2 id="c-基础" tabindex="-1"><a class="header-anchor" href="#c-基础" aria-hidden="true">#</a> c++基础</h2><h3 id="i和i-哪个效率更高" tabindex="-1"><a class="header-anchor" href="#i和i-哪个效率更高" aria-hidden="true">#</a> ++i和i++哪个效率更高？</h3><p>对于<strong>内建数据类型</strong>，效率没有区别。</p><p>对于<strong>自定义的数据类型</strong>， 前缀式(++i)可以返回对象的引用，而后缀式(i++)必须返回对象的值，存在复制开销。因此++i效率更高。</p><h3 id="c-中const的作用" tabindex="-1"><a class="header-anchor" href="#c-中const的作用" aria-hidden="true">#</a> c++中const的作用</h3><ul><li>1.用于定义常量(注意修饰指针时的含义)</li><li>2.用于修饰函数形参</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">const</span> A<span class="token operator">&amp;</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>3.const修饰函数返回值</li><li>4.const修饰类的成员函数</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">getValue</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="如何禁用拷贝构造函数" tabindex="-1"><a class="header-anchor" href="#如何禁用拷贝构造函数" aria-hidden="true">#</a> 如何禁用拷贝构造函数</h3><ul><li><p>如果你的编译器支持 C++11，直接使用 delete</p></li><li><p>可以把拷贝构造函数和赋值操作符声明成private同时不提供实现。</p></li><li><p>可以通过一个基类来封装第二步，因为默认生成的拷贝构造函数会自动调用基类的拷贝构造函数，如果基类的拷贝构造函数是private，那么它无法访问，也就无法正常生成拷贝构造函数</p></li></ul><h2 id="类和对象" tabindex="-1"><a class="header-anchor" href="#类和对象" aria-hidden="true">#</a> 类和对象</h2><p><strong>什么是RTTI</strong></p><p>RTTI（Run-Time Type Information，运行时类型信息）是一种在程序运行时提供对象类型信息的机制。它允许在运行时检查对象的类型，通常用于以下几个方面：</p><ul><li>类型识别：确定一个对象是否属于特定的类，或者确定对象的实际类型。</li><li>动态转换：安全地将基类指针或引用转换为派生类指针或引用。</li><li>调试和日志记录：在调试和日志记录过程中获取对象的类型信息。</li></ul><p>在C++中，RTTI主要通过以下两个操作符实现：</p><ul><li><p>typeid：用于获取对象的类型信息。例如，typeid(object)会返回一个表示object类型的std::type_info对象。</p></li><li><p>dynamic_cast：用于将基类指针或引用安全地转换为派生类指针或引用。只有在转换是合法的情况下，dynamic_cast才会成功，否则会返回nullptr（对于指针）或抛出std::bad_cast异常（对于引用）。</p></li><li></li></ul><p>使用RTTI需要在编译时启用支持RTTI的选项，因为某些编译器可能默认禁用RTTI以优化性能和减小代码大小。RTTI机制在C++的多态性（polymorphism）中非常有用，特别是在处理继承层次结构复杂的情况下。</p><p>以下是一个简单的示例，展示了RTTI的使用：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;typeinfo&gt;</span></span>

<span class="token keyword">class</span> <span class="token class-name">Base</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Base</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Derived</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Base</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Base<span class="token operator">*</span> b <span class="token operator">=</span> <span class="token keyword">new</span> Derived<span class="token punctuation">;</span>
    
    <span class="token comment">// 使用typeid操作符</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;Type of b: &quot;</span> <span class="token operator">&lt;&lt;</span> <span class="token keyword">typeid</span><span class="token punctuation">(</span><span class="token operator">*</span>b<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>

    <span class="token comment">// 使用dynamic_cast进行安全的向下转换</span>
    Derived<span class="token operator">*</span> d <span class="token operator">=</span> <span class="token generic-function"><span class="token function">dynamic_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span>Derived<span class="token operator">*</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;b is of type Derived.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;b is not of type Derived.&quot;</span> <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">delete</span> b<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，<code>typeid</code>用于获取对象的类型信息，而<code>dynamic_cast</code>用于安全地将基类指针转换为派生类指针。</p><h2 id="stl" tabindex="-1"><a class="header-anchor" href="#stl" aria-hidden="true">#</a> STL</h2><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,24),d={href:"https://zhuanlan.zhihu.com/p/629336564(%E5%90%AB%E7%AD%94%E6%A1%88)",target:"_blank",rel:"noopener noreferrer"};function u(k,v){const s=l("ExternalLinkIcon");return e(),t("div",null,[r,n("p",null,[n("a",d,[p("https://zhuanlan.zhihu.com/p/629336564(含答案)"),o(s)])])])}const h=a(i,[["render",u],["__file","cpp.html.vue"]]);export{h as default};
