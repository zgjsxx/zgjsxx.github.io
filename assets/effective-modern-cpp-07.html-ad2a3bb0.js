import{_ as n,V as s,W as a,a0 as e}from"./framework-c954d91f.js";const p={},t=e(`<h1 id="item7-区别使用-和-创建对象" tabindex="-1"><a class="header-anchor" href="#item7-区别使用-和-创建对象" aria-hidden="true">#</a> Item7：区别使用()和{}创建对象</h1><h2 id="初始化的方式" tabindex="-1"><a class="header-anchor" href="#初始化的方式" aria-hidden="true">#</a> 初始化的方式</h2><p>c++常见的初始化方式有如下几种：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">x</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>               <span class="token comment">//使用圆括号初始化</span>

<span class="token keyword">int</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>              <span class="token comment">//使用&quot;=&quot;初始化</span>

<span class="token keyword">int</span> z<span class="token punctuation">{</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>             <span class="token comment">//使用花括号初始化</span>

<span class="token keyword">int</span> z <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>          <span class="token comment">//使用&quot;=&quot;和花括号， 和只有花括号没有区别</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于像int这样的内置类型，研究两者区别就像在做学术，但是对于用户定义的类型而言，区别赋值运算符和初始化就非常重要了，因为它们涉及不同的函数调用：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>Widget w1<span class="token punctuation">;</span>              <span class="token comment">//调用默认构造函数</span>

Widget w2 <span class="token operator">=</span> w1<span class="token punctuation">;</span>         <span class="token comment">//不是赋值运算，调用拷贝构造函数</span>

w1 <span class="token operator">=</span> w2<span class="token punctuation">;</span>                <span class="token comment">//是赋值运算，调用拷贝赋值运算符（copy operator=）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>甚至对于一些初始化语法，在一些情况下C++98没有办法表达预期的初始化行为。举个例子，要想直接创建并初始化一个存放一些特殊值的STL容器是不可能的（比如1,3,5）。</p><p>C++11使用统一初始化（uniform initialization）来整合这些混乱且不适于所有情景的初始化语法，所谓统一初始化是指在任何涉及初始化的地方都使用单一的初始化语法。 它基于花括号，出于这个原因我更喜欢称之为括号初始化。（译注：注意，这里的括号初始化指的是花括号初始化，在没有歧义的情况下下文的括号初始化指的都是用花括号进行初始化；当与圆括号初始化同时存在并可能产生歧义时我会直接指出。）统一初始化是一个概念上的东西，而括号初始化是一个具体语法结构。</p><p>括号初始化让你可以表达以前表达不出的东西。使用花括号，创建并指定一个容器的初始元素变得很容易：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span> v<span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">//v初始内容为1,3,5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>括号初始化也能被用于为非静态数据成员指定默认初始值。C++11允许&quot;=&quot;初始化不加花括号也拥有这种能力：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Widget</span><span class="token punctuation">{</span>
    …

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> x<span class="token punctuation">{</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>                 <span class="token comment">//没问题，x初始值为0</span>
    <span class="token keyword">int</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>                  <span class="token comment">//也可以</span>
    <span class="token keyword">int</span> <span class="token function">z</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>                   <span class="token comment">//错误！</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一方面，不可拷贝的对象（例如std::atomic——见Item40）可以使用花括号初始化或者圆括号初始化，但是不能使用&quot;=&quot;初始化：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>std<span class="token double-colon punctuation">::</span>atomic<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span> ai1<span class="token punctuation">{</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>      <span class="token comment">//没问题</span>
std<span class="token double-colon punctuation">::</span>atomic<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span> <span class="token function">ai2</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        <span class="token comment">//没问题</span>
std<span class="token double-colon punctuation">::</span>atomic<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span> ai3 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>       <span class="token comment">//错误！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此我们很容易理解为什么括号初始化又叫统一初始化，在C++中这三种方式都被看做是初始化表达式，但是只有花括号任何地方都能被使用。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>花括号初始化是最广泛使用的初始化语法，它防止变窄转换，并且对于C++最令人头疼的解析有天生的免疫性</li><li>在构造函数重载决议中，编译器会尽最大努力将括号初始化与std::initializer_list参数匹配，即便其他构造函数看起来是更好的选择</li><li>对于数值类型的std::vector来说使用花括号初始化和圆括号初始化会造成巨大的不同</li><li>在模板类选择使用圆括号初始化或使用花括号初始化创建对象是一个挑战。</li></ul>`,17),o=[t];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","effective-modern-cpp-07.html.vue"]]);export{d as default};
