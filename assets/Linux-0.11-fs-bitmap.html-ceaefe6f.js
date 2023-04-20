import{_ as n,V as s,W as a,a0 as t}from"./framework-c954d91f.js";const p={},e=t(`<h1 id="linux-0-11-文件系统bitmap-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-文件系统bitmap-c详解" aria-hidden="true">#</a> Linux-0.11 文件系统bitmap.c详解</h1><h2 id="模块简介" tabindex="-1"><a class="header-anchor" href="#模块简介" aria-hidden="true">#</a> 模块简介</h2><h2 id="函数详解" tabindex="-1"><a class="header-anchor" href="#函数详解" aria-hidden="true">#</a> 函数详解</h2><h3 id="free-block" tabindex="-1"><a class="header-anchor" href="#free-block" aria-hidden="true">#</a> free_block</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">free_block</span><span class="token punctuation">(</span><span class="token keyword">int</span> dev<span class="token punctuation">,</span> <span class="token keyword">int</span> block<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是释放设备dev上的序号为block的逻辑块。</p><p>首先从设备dev中取出超级快。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">super_block</span> <span class="token operator">*</span> sb<span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">buffer_head</span> <span class="token operator">*</span> bh<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>sb <span class="token operator">=</span> <span class="token function">get_super</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free block on nonexistent device&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来判断盘块号block的有效性，如果盘块号block小于数据区一个数据块的盘块号或者大于设备上的总的逻辑块， 则出错停机。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>block <span class="token operator">&lt;</span> sb<span class="token operator">-&gt;</span>s_firstdatazone <span class="token operator">||</span> block <span class="token operator">&gt;=</span> sb<span class="token operator">-&gt;</span>s_nzones<span class="token punctuation">)</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free block not in datazone&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来从哈希链表中查找bh块， 如果找到了， 如果引用计数&gt;=2， 则返回。 如果引用计数为1， 则将bh块上的b_dirt和b_uptodate属性置为0，然后将引用计数减1。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>bh <span class="token operator">=</span> <span class="token function">get_hash_table</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span>block<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>bh<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bh<span class="token operator">-&gt;</span>b_count <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free block (%04x:%d), count=%d\\n&quot;</span><span class="token punctuation">,</span>
            dev<span class="token punctuation">,</span>block<span class="token punctuation">,</span>bh<span class="token operator">-&gt;</span>b_count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    bh<span class="token operator">-&gt;</span>b_dirt<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    bh<span class="token operator">-&gt;</span>b_uptodate<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token function">brelse</span><span class="token punctuation">(</span>bh<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，将block对应的数据块位图置为0， 代表该块已经被释放。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>block <span class="token operator">-=</span> sb<span class="token operator">-&gt;</span>s_firstdatazone <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">clear_bit</span><span class="token punctuation">(</span>block<span class="token operator">&amp;</span><span class="token number">8191</span><span class="token punctuation">,</span>sb<span class="token operator">-&gt;</span>s_zmap<span class="token punctuation">[</span>block<span class="token operator">/</span><span class="token number">8192</span><span class="token punctuation">]</span><span class="token operator">-&gt;</span>b_data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;block (%04x:%d) &quot;</span><span class="token punctuation">,</span>dev<span class="token punctuation">,</span>block<span class="token operator">+</span>sb<span class="token operator">-&gt;</span>s_firstdatazone<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;free_block: bit already cleared&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
sb<span class="token operator">-&gt;</span>s_zmap<span class="token punctuation">[</span>block<span class="token operator">/</span><span class="token number">8192</span><span class="token punctuation">]</span><span class="token operator">-&gt;</span>b_dirt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="new-block" tabindex="-1"><a class="header-anchor" href="#new-block" aria-hidden="true">#</a> new_block</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">new_block</span><span class="token punctuation">(</span><span class="token keyword">int</span> dev<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>	<span class="token keyword">struct</span> <span class="token class-name">buffer_head</span> <span class="token operator">*</span> bh<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">super_block</span> <span class="token operator">*</span> sb<span class="token punctuation">;</span>
	<span class="token keyword">int</span> i<span class="token punctuation">,</span>j<span class="token punctuation">;</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>sb <span class="token operator">=</span> <span class="token function">get_super</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to get new block from nonexistant device&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	j <span class="token operator">=</span> <span class="token number">8192</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span> <span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">8</span> <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>bh<span class="token operator">=</span>sb<span class="token operator">-&gt;</span>s_zmap<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>j<span class="token operator">=</span><span class="token function">find_first_zero</span><span class="token punctuation">(</span>bh<span class="token operator">-&gt;</span>b_data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token number">8192</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>i<span class="token operator">&gt;=</span><span class="token number">8</span> <span class="token operator">||</span> <span class="token operator">!</span>bh <span class="token operator">||</span> j<span class="token operator">&gt;=</span><span class="token number">8192</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">set_bit</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span>bh<span class="token operator">-&gt;</span>b_data<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;new_block: bit already set&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	bh<span class="token operator">-&gt;</span>b_dirt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	j <span class="token operator">+=</span> i<span class="token operator">*</span><span class="token number">8192</span> <span class="token operator">+</span> sb<span class="token operator">-&gt;</span>s_firstdatazone<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">&gt;=</span> sb<span class="token operator">-&gt;</span>s_nzones<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>bh<span class="token operator">=</span><span class="token function">getblk</span><span class="token punctuation">(</span>dev<span class="token punctuation">,</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;new_block: cannot get block&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>bh<span class="token operator">-&gt;</span>b_count <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;new block: count is != 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">clear_block</span><span class="token punctuation">(</span>bh<span class="token operator">-&gt;</span>b_data<span class="token punctuation">)</span><span class="token punctuation">;</span>
	bh<span class="token operator">-&gt;</span>b_uptodate <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	bh<span class="token operator">-&gt;</span>b_dirt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token function">brelse</span><span class="token punctuation">(</span>bh<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> j<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="free-inode" tabindex="-1"><a class="header-anchor" href="#free-inode" aria-hidden="true">#</a> free_inode</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">free_inode</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">m_inode</span> <span class="token operator">*</span> inode<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用是释放指定的inode节点。该函数在iput函数(inode.c)中如果文件的链接数为0的时候被调用。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>	<span class="token keyword">struct</span> <span class="token class-name">super_block</span> <span class="token operator">*</span> sb<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">buffer_head</span> <span class="token operator">*</span> bh<span class="token punctuation">;</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>inode<span class="token punctuation">)</span>
		<span class="token keyword">return</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>inode<span class="token operator">-&gt;</span>i_dev<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">memset</span><span class="token punctuation">(</span>inode<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token operator">*</span>inode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_count<span class="token operator">&gt;</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free inode with count=%d\\n&quot;</span><span class="token punctuation">,</span>inode<span class="token operator">-&gt;</span>i_count<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;free_inode&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_nlinks<span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free inode with links&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>sb <span class="token operator">=</span> <span class="token function">get_super</span><span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_dev<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free inode on nonexistent device&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_num <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> inode<span class="token operator">-&gt;</span>i_num <span class="token operator">&gt;</span> sb<span class="token operator">-&gt;</span>s_ninodes<span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free inode 0 or nonexistant inode&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>bh<span class="token operator">=</span>sb<span class="token operator">-&gt;</span>s_imap<span class="token punctuation">[</span>inode<span class="token operator">-&gt;</span>i_num<span class="token operator">&gt;&gt;</span><span class="token number">13</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;nonexistent imap in superblock&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">clear_bit</span><span class="token punctuation">(</span>inode<span class="token operator">-&gt;</span>i_num<span class="token operator">&amp;</span><span class="token number">8191</span><span class="token punctuation">,</span>bh<span class="token operator">-&gt;</span>b_data<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token function">printk</span><span class="token punctuation">(</span><span class="token string">&quot;free_inode: bit already cleared.\\n\\r&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	bh<span class="token operator">-&gt;</span>b_dirt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token function">memset</span><span class="token punctuation">(</span>inode<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token operator">*</span>inode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="new-inode" tabindex="-1"><a class="header-anchor" href="#new-inode" aria-hidden="true">#</a> new_inode</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">m_inode</span> <span class="token operator">*</span> <span class="token function">new_inode</span><span class="token punctuation">(</span><span class="token keyword">int</span> dev<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>	<span class="token keyword">struct</span> <span class="token class-name">m_inode</span> <span class="token operator">*</span> inode<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">super_block</span> <span class="token operator">*</span> sb<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">buffer_head</span> <span class="token operator">*</span> bh<span class="token punctuation">;</span>
	<span class="token keyword">int</span> i<span class="token punctuation">,</span>j<span class="token punctuation">;</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>inode<span class="token operator">=</span><span class="token function">get_empty_inode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>sb <span class="token operator">=</span> <span class="token function">get_super</span><span class="token punctuation">(</span>dev<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;new_inode with unknown device&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	j <span class="token operator">=</span> <span class="token number">8192</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span> <span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">8</span> <span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>bh<span class="token operator">=</span>sb<span class="token operator">-&gt;</span>s_imap<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>j<span class="token operator">=</span><span class="token function">find_first_zero</span><span class="token punctuation">(</span>bh<span class="token operator">-&gt;</span>b_data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token number">8192</span><span class="token punctuation">)</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bh <span class="token operator">||</span> j <span class="token operator">&gt;=</span> <span class="token number">8192</span> <span class="token operator">||</span> j<span class="token operator">+</span>i<span class="token operator">*</span><span class="token number">8192</span> <span class="token operator">&gt;</span> sb<span class="token operator">-&gt;</span>s_ninodes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">iput</span><span class="token punctuation">(</span>inode<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">set_bit</span><span class="token punctuation">(</span>j<span class="token punctuation">,</span>bh<span class="token operator">-&gt;</span>b_data<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;new_inode: bit already set&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	bh<span class="token operator">-&gt;</span>b_dirt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	inode<span class="token operator">-&gt;</span>i_count<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
	inode<span class="token operator">-&gt;</span>i_nlinks<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
	inode<span class="token operator">-&gt;</span>i_dev<span class="token operator">=</span>dev<span class="token punctuation">;</span>
	inode<span class="token operator">-&gt;</span>i_uid<span class="token operator">=</span>current<span class="token operator">-&gt;</span>euid<span class="token punctuation">;</span>
	inode<span class="token operator">-&gt;</span>i_gid<span class="token operator">=</span>current<span class="token operator">-&gt;</span>egid<span class="token punctuation">;</span>
	inode<span class="token operator">-&gt;</span>i_dirt<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
	inode<span class="token operator">-&gt;</span>i_num <span class="token operator">=</span> j <span class="token operator">+</span> i<span class="token operator">*</span><span class="token number">8192</span><span class="token punctuation">;</span>
	inode<span class="token operator">-&gt;</span>i_mtime <span class="token operator">=</span> inode<span class="token operator">-&gt;</span>i_atime <span class="token operator">=</span> inode<span class="token operator">-&gt;</span>i_ctime <span class="token operator">=</span> CURRENT_TIME<span class="token punctuation">;</span>
	<span class="token keyword">return</span> inode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","Linux-0.11-fs-bitmap.html.vue"]]);export{r as default};