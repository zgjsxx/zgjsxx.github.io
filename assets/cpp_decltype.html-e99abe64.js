import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const p={},t=e(`<h1 id="decltype" tabindex="-1"><a class="header-anchor" href="#decltype" aria-hidden="true">#</a> decltype</h1><p>左值表达式有哪些?</p><ul><li>++操作</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Test</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Test</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">value_</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">return</span> value_<span class="token punctuation">}</span><span class="token punctuation">;</span>

    Test<span class="token operator">&amp;</span> <span class="token keyword">operator</span><span class="token operator">++</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token operator">++</span>value_<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    Test <span class="token keyword">operator</span><span class="token operator">++</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        Test <span class="token function">ret</span><span class="token punctuation">(</span>value_<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token operator">++</span>value_<span class="token punctuation">;</span>
        <span class="token keyword">return</span> ret
    <span class="token punctuation">}</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">int</span> value_<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>decltype 推导规则 上面的例子让我们初步感受了一下 decltype 的用法，但你不要认为 decltype 就这么简单，它的玩法实际上可以非常复杂。当程序员使用 decltype(exp) 获取类型时，编译器将根据以下三条规则得出结果：</p><ul><li>如果 exp 是一个不被括号( )包围的表达式，或者是一个类成员访问表达式，或者是一个单独的变量，那么 decltype(exp) 的类型就和 exp 一致，这是最普遍最常见的情况。</li><li>如果 exp 是函数调用，那么 decltype(exp) 的类型就和函数返回值的类型一致。</li><li>如果 exp 是一个左值表达式，例如被括号( )包围，那么 decltype(exp) 的类型就是 exp 的引用；假设 exp 的类型为 T，那么 decltype(exp) 的类型就是 T&amp;。</li></ul>`,6),c=[t];function l(o,i){return s(),a("div",null,c)}const d=n(p,[["render",l],["__file","cpp_decltype.html.vue"]]);export{d as default};
