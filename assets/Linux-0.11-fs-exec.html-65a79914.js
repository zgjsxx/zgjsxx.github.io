import{_ as a,V as n,W as s,a0 as e}from"./framework-c954d91f.js";const t={},c=e(`<h1 id="linux-0-11-文件系统exec-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-文件系统exec-c详解" aria-hidden="true">#</a> Linux-0.11 文件系统exec.c详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><h2 id="函数详解" tabindex="-1"><a class="header-anchor" href="#函数详解" aria-hidden="true">#</a> 函数详解</h2><h3 id="create-tables" tabindex="-1"><a class="header-anchor" href="#create-tables" aria-hidden="true">#</a> create_tables</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span> <span class="token function">create_tables</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span> p<span class="token punctuation">,</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span><span class="token keyword">int</span> envc<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="count" tabindex="-1"><a class="header-anchor" href="#count" aria-hidden="true">#</a> count</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span> argv<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="copy-strings" tabindex="-1"><a class="header-anchor" href="#copy-strings" aria-hidden="true">#</a> copy_strings</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token function">copy_strings</span><span class="token punctuation">(</span><span class="token keyword">int</span> argc<span class="token punctuation">,</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span> argv<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span>page<span class="token punctuation">,</span>
		<span class="token keyword">unsigned</span> <span class="token keyword">long</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> from_kmem<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="change-ldt" tabindex="-1"><a class="header-anchor" href="#change-ldt" aria-hidden="true">#</a> change_ldt</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token function">change_ldt</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> text_size<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span> page<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="do-execve" tabindex="-1"><a class="header-anchor" href="#do-execve" aria-hidden="true">#</a> do_execve</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">do_execve</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span> eip<span class="token punctuation">,</span><span class="token keyword">long</span> tmp<span class="token punctuation">,</span><span class="token keyword">char</span> <span class="token operator">*</span> filename<span class="token punctuation">,</span>
	<span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span> argv<span class="token punctuation">,</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token operator">*</span> envp<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q &amp; A</h2>`,14),o=[c];function p(r,d){return n(),s("div",null,o)}const l=a(t,[["render",p],["__file","Linux-0.11-fs-exec.html.vue"]]);export{l as default};
