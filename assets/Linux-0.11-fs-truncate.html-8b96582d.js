import{_ as n,V as s,W as a,a0 as e}from"./framework-c954d91f.js";const p={},t=e(`<h1 id="linux-0-11-文件系统truncate-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-文件系统truncate-c详解" aria-hidden="true">#</a> Linux-0.11 文件系统truncate.c详解</h1><h2 id="free-ind" tabindex="-1"><a class="header-anchor" href="#free-ind" aria-hidden="true">#</a> free_ind</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">free_ind</span><span class="token punctuation">(</span><span class="token keyword">int</span> dev<span class="token punctuation">,</span><span class="token keyword">int</span> block<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是释放所有的一次间接块。</p><p>该函数首先读取一次间接块到bh中, 该bh块中存储了512个盘块号。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">buffer_head</span> <span class="token operator">*</span> bh<span class="token punctuation">;</span>
<span class="token keyword">unsigned</span> <span class="token keyword">short</span> <span class="token operator">*</span> p<span class="token punctuation">;</span>
<span class="token keyword">int</span> i<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>block<span class="token punctuation">)</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>bh<span class="token operator">=</span><span class="token function">bread</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span>block<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来就对这512个盘块号进行遍历，如果盘块号不为0， 就调用<strong>free_block</strong>(bitmap.c中)释放该盘块。遍历完毕之后，将一次间接块的bh块引用计数减1。最后将这个一次间接块也进行释放。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">512</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">,</span>p<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span>
        <span class="token function">free_block</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">brelse</span><span class="token punctuation">(</span>bh<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">free_block</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span>block<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="free-dind" tabindex="-1"><a class="header-anchor" href="#free-dind" aria-hidden="true">#</a> free_dind</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">free_dind</span><span class="token punctuation">(</span><span class="token keyword">int</span> dev<span class="token punctuation">,</span><span class="token keyword">int</span> block<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用就是释放所有的二次间接块。</p><p>该函数首先对盘块号的有效性进行校验。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">buffer_head</span> <span class="token operator">*</span> bh<span class="token punctuation">;</span>
<span class="token keyword">unsigned</span> <span class="token keyword">short</span> <span class="token operator">*</span> p<span class="token punctuation">;</span>
<span class="token keyword">int</span> i<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>block<span class="token punctuation">)</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着读取二次间接块到bh中, 该bh块中存储了512个一次间接块的盘块号。</p><p>接下来就对这512个一次间接块的盘块号进行遍历，如果盘块号不为0， 就调用<strong>free_ind</strong>释放该一次间接块所有的block。遍历完毕之后，将二次间接块的bh块引用计数减1。最后将这个二次间接块也进行释放。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>bh<span class="token operator">=</span><span class="token function">bread</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span>block<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">short</span> <span class="token operator">*</span><span class="token punctuation">)</span> bh<span class="token operator">-&gt;</span>b_data<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">512</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">,</span>p<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span>
            <span class="token function">free_ind</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">brelse</span><span class="token punctuation">(</span>bh<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">free_block</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span>block<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="truncate" tabindex="-1"><a class="header-anchor" href="#truncate" aria-hidden="true">#</a> truncate</h1><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">truncate</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">m_inode</span> <span class="token operator">*</span> inode<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是释放该inode所占据的磁盘空间。 该函数在iput函数(inode.c)中如果文件的链接数为0的时候被调用。</p><p>如果不是常规文件或者是目录文件， 就跳过。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token function">S_ISREG</span><span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_mode<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">S_ISDIR</span><span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_mode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>释放直接引用块。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token number">7</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_zone<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">free_block</span><span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_dev<span class="token punctuation">,</span>inode<span class="token operator">-&gt;</span>i_zone<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        inode<span class="token operator">-&gt;</span>i_zone<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>释放一次间接块和二次间接块。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token function">free_ind</span><span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_dev<span class="token punctuation">,</span>inode<span class="token operator">-&gt;</span>i_zone<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">free_dind</span><span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_dev<span class="token punctuation">,</span>inode<span class="token operator">-&gt;</span>i_zone<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>将一次间接块和二次间接块的地址置为0。将inode的size置为0， 将该inode设置为含有脏数据， 最后将inode的修改时候和创建时间都修改为当前时间。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>inode<span class="token operator">-&gt;</span>i_zone<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span> <span class="token operator">=</span> inode<span class="token operator">-&gt;</span>i_zone<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
inode<span class="token operator">-&gt;</span>i_size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
inode<span class="token operator">-&gt;</span>i_dirt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
inode<span class="token operator">-&gt;</span>i_mtime <span class="token operator">=</span> inode<span class="token operator">-&gt;</span>i_ctime <span class="token operator">=</span> CURRENT_TIME<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,27),o=[t];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","Linux-0.11-fs-truncate.html.vue"]]);export{r as default};
