import{_ as n,V as s,W as a,a0 as e}from"./framework-c954d91f.js";const d={},c=e(`<h1 id="linux-0-11-文件系统fcntl-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-文件系统fcntl-c详解" aria-hidden="true">#</a> Linux-0.11 文件系统fcntl.c详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><h2 id="函数详解" tabindex="-1"><a class="header-anchor" href="#函数详解" aria-hidden="true">#</a> 函数详解</h2><h3 id="dupfd" tabindex="-1"><a class="header-anchor" href="#dupfd" aria-hidden="true">#</a> dupfd</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">dupfd</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> arg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sys-dup2" tabindex="-1"><a class="header-anchor" href="#sys-dup2" aria-hidden="true">#</a> sys_dup2</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_dup2</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> oldfd<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> newfd<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sys-dup" tabindex="-1"><a class="header-anchor" href="#sys-dup" aria-hidden="true">#</a> sys_dup</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_dup</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> fildes<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="sys-fcntl" tabindex="-1"><a class="header-anchor" href="#sys-fcntl" aria-hidden="true">#</a> sys_fcntl</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">sys_fcntl</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span> cmd<span class="token punctuation">,</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> arg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,12),t=[c];function i(o,p){return s(),a("div",null,t)}const r=n(d,[["render",i],["__file","Linux-0.11-fs-fcntl.html.vue"]]);export{r as default};
