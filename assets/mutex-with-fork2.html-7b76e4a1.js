import{_ as p,V as e,W as o,X as n,Y as s,Z as t,a1 as c,F as i}from"./framework-d934f75f.js";const l={},u=c(`<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/wait.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token keyword">using</span> std<span class="token double-colon punctuation">::</span>string<span class="token punctuation">;</span>
pthread_mutex_t mutex <span class="token operator">=</span> PTHREAD_MUTEX_INITIALIZER<span class="token punctuation">;</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>arg <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token keyword">char</span><span class="token operator">*</span> str <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span>arg<span class="token punctuation">;</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%s sleep 1s\\n&quot;</span><span class="token punctuation">,</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;parent sleep 1s\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">parent</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">child</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//pthread_atfork(NULL, NULL, child);</span>

    pthread_t tid<span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> func<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">fork</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        string str <span class="token operator">=</span> <span class="token string">&quot;child&quot;</span><span class="token punctuation">;</span>
        <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span><span class="token punctuation">)</span>str<span class="token punctuation">.</span><span class="token function">c_str</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;no deadlock\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">wait</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),r={href:"https://wizardforcel.gitbooks.io/100-gdb-tips/content/set-detach-on-fork.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://zhuanlan.zhihu.com/p/343845048",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/lattera/glibc/blob/master/nptl/pthread_mutex_unlock.c",target:"_blank",rel:"noopener noreferrer"};function v(m,b){const a=i("ExternalLinkIcon");return e(),o("div",null,[u,n("p",null,[s("set detach-on-fork off (gdb) inferior 2 "),n("a",r,[s("https://wizardforcel.gitbooks.io/100-gdb-tips/content/set-detach-on-fork.html"),t(a)]),n("a",k,[s("https://zhuanlan.zhihu.com/p/343845048"),t(a)]),n("a",d,[s("https://github.com/lattera/glibc/blob/master/nptl/pthread_mutex_unlock.c"),t(a)])])])}const f=p(l,[["render",v],["__file","mutex-with-fork2.html.vue"]]);export{f as default};
