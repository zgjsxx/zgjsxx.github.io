import{_ as n,V as s,W as a,a0 as e}from"./framework-c954d91f.js";const p={},t=e(`<h1 id="linux-0-11-memory-c详解" tabindex="-1"><a class="header-anchor" href="#linux-0-11-memory-c详解" aria-hidden="true">#</a> Linux-0.11 memory.c详解</h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>内存区域划分</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/Linux-0.11-memory/mem-area.png" alt="memory-area" tabindex="0" loading="lazy"><figcaption>memory-area</figcaption></figure><p>在Linux-0.11内核中，所有进程都使用一个页目录表，而每个进程都有自己的页表。</p><p>页目录表和页表的格式</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/Linux-0.11-memory/page_frame.png" alt="memory-area" tabindex="0" loading="lazy"><figcaption>memory-area</figcaption></figure><p>图中页表项的第0位P代表<strong>存在位</strong>，该位表示这个页表项是否可以用于地址转换，P=1代表该项可用， 当目录表项或者第二级表项的P=0时，代表该项是无效的，不能用于地址转换。</p><p>当P=0时， 处理器会发出缺页异常的信号， 缺页中断的异常处理程序就可以将所请求的页面加入到物理内存中。</p><h2 id="函数分析" tabindex="-1"><a class="header-anchor" href="#函数分析" aria-hidden="true">#</a> 函数分析</h2><h3 id="get-free-page" tabindex="-1"><a class="header-anchor" href="#get-free-page" aria-hidden="true">#</a> get_free_page</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token function">get_free_page</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>作用</strong>: 获取一个空闲页面， 从内存的高地址向低地址开始搜索</p><p>%1: ax = 0 %2 LOW_MEM %3: cx = PAGING_PAGES %4 edi = mem_map+PAGING_PAGES-1</p><p>将edi的值指向了mem_map数组的尾,如下图所示：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/Linux/Linux-0.11-memory/get_free_page.png" alt="get_free_page" tabindex="0" loading="lazy"><figcaption>get_free_page</figcaption></figure><p>然后从mem_map的尾部向前搜寻为0的项目，这样就可以找到空闲的物理内存。</p><h3 id="free-page" tabindex="-1"><a class="header-anchor" href="#free-page" aria-hidden="true">#</a> free_page</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">free_page</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该函数的作用就是释放某个地址所在的内存页。</p><p>该函数首先对地址addr进行校验， 如果addr小于LOW_MEM，就会直接返回。如果addr大于HIGH_MEMORY，将会抛出一个内核错误。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>addr <span class="token operator">&lt;</span> LOW_MEM<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>addr <span class="token operator">&gt;=</span> HIGH_MEMORY<span class="token punctuation">)</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free nonexistent page&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来就根据addr计算出在mem_map中的下标，并将该地址的使用次数减去1。如果该地址的使用次数为0，却尝试去释放，那么也会抛出内核错误。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>addr <span class="token operator">-=</span> LOW_MEM<span class="token punctuation">;</span>
addr <span class="token operator">&gt;&gt;=</span> <span class="token number">12</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>mem_map<span class="token punctuation">[</span>addr<span class="token punctuation">]</span><span class="token operator">--</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
mem_map<span class="token punctuation">[</span>addr<span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;trying to free free page&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="free-page-tables" tabindex="-1"><a class="header-anchor" href="#free-page-tables" aria-hidden="true">#</a> free_page_tables</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">free_page_tables</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> from<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> size<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span>pg_table<span class="token punctuation">;</span>
<span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span> dir<span class="token punctuation">,</span> nr<span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span>from <span class="token operator">&amp;</span> <span class="token number">0x3fffff</span><span class="token punctuation">)</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;free_page_tables called with wrong alignment&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>from<span class="token punctuation">)</span>
    <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;Trying to free up swapper memory space&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是计算大小为size的内存空间占据多少个页目录项。一个页目录项可以管理4M的内存，因此移位<code>c&gt;&gt;22</code>可以计算size占用多少个4M， 而其中加上0x3fffff是采用了进1法计算占用空间。</p><p>例如size = 4M + 1byte(0x400001)，</p><p>那么(size + 0x3fffff) &gt;&gt; 22 = (0x400001 + 0x3fffff) &gt;&gt; 22 = 2</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>size <span class="token operator">=</span> <span class="token punctuation">(</span>size <span class="token operator">+</span> <span class="token number">0x3fffff</span><span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">22</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面的代码用于计算from所在的页目录项的地址。</p><p>其中，(from&gt;&gt;20) &amp; 0xffc 等同于 (from &gt;&gt; 22) &lt;&lt; 2</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>dir <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>from<span class="token operator">&gt;&gt;</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0xffc</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* _pg_dir = 0 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>得到页目录项的起始地址dir和占据的页目录项个数size后，就开始遍历，依次进行释放。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token punctuation">;</span> size<span class="token operator">--</span><span class="token operator">&gt;</span><span class="token number">0</span> <span class="token punctuation">;</span> dir<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">//遍历dir</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&amp;</span> <span class="token operator">*</span>dir<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//判断存在位是否为0</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
    pg_table <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token number">0xfffff000</span> <span class="token operator">&amp;</span> <span class="token operator">*</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//取出页表的地址</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>nr<span class="token operator">=</span><span class="token number">0</span> <span class="token punctuation">;</span> nr<span class="token operator">&lt;</span><span class="token number">1024</span> <span class="token punctuation">;</span> nr<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&amp;</span> <span class="token operator">*</span>pg_table<span class="token punctuation">)</span><span class="token comment">//判断存在位为0</span>
            <span class="token function">free_page</span><span class="token punctuation">(</span><span class="token number">0xfffff000</span> <span class="token operator">&amp;</span> <span class="token operator">*</span>pg_table<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//释放该页表对应的内存</span>
        <span class="token operator">*</span>pg_table <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        pg_table<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">free_page</span><span class="token punctuation">(</span><span class="token number">0xfffff000</span> <span class="token operator">&amp;</span> <span class="token operator">*</span>dir<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">*</span>dir <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="copy-page-tables" tabindex="-1"><a class="header-anchor" href="#copy-page-tables" aria-hidden="true">#</a> copy_page_tables</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">copy_page_tables</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> from<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> to<span class="token punctuation">,</span><span class="token keyword">long</span> size<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面的代码是不是很熟悉？ 在上面的free_page_tables中就有提到过，其作用是取出from和to所在的页目录项的起始地址。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>from_dir <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>from<span class="token operator">&gt;&gt;</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0xffc</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* _pg_dir = 0 */</span>
to_dir <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>to<span class="token operator">&gt;&gt;</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0xffc</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里是计算大小为size的内存空间占据多少个页目录项。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>size <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>size<span class="token operator">+</span><span class="token number">0x3fffff</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&gt;&gt;</span> <span class="token number">22</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">for</span><span class="token punctuation">(</span> <span class="token punctuation">;</span> size<span class="token operator">--</span><span class="token operator">&gt;</span><span class="token number">0</span> <span class="token punctuation">;</span> from_dir<span class="token operator">++</span><span class="token punctuation">,</span>to_dir<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&amp;</span> <span class="token operator">*</span>to_dir<span class="token punctuation">)</span><span class="token comment">//如果目的页目录表存在位为0， 则代表目的页目录表已经存在，这将是致命的错误</span>
        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;copy_page_tables: already exist&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&amp;</span> <span class="token operator">*</span>from_dir<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//如果源页目录表存在位为0， 则代表该页目录表可以不用复制</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
		from_page_table <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token number">0xfffff000</span> <span class="token operator">&amp;</span> <span class="token operator">*</span>from_dir<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//取出源地址的页表起始的位置</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>to_page_table <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">get_free_page</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//申请一个4k内存页面，作为目的地址的页表</span>
			<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>	<span class="token comment">/* Out of memory, see freeing */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面这里依次拷贝页表中的每一项。</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token punctuation">;</span> nr<span class="token operator">--</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">;</span> from_page_table<span class="token operator">++</span><span class="token punctuation">,</span>to_page_table<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    this_page <span class="token operator">=</span> <span class="token operator">*</span>from_page_table<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&amp;</span> this_page<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
    this_page <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token operator">*</span>to_page_table <span class="token operator">=</span> this_page<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>this_page <span class="token operator">&gt;</span> LOW_MEM<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token operator">*</span>from_page_table <span class="token operator">=</span> this_page<span class="token punctuation">;</span>
        this_page <span class="token operator">-=</span> LOW_MEM<span class="token punctuation">;</span>
        this_page <span class="token operator">&gt;&gt;=</span> <span class="token number">12</span><span class="token punctuation">;</span>
        mem_map<span class="token punctuation">[</span>this_page<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="put-page" tabindex="-1"><a class="header-anchor" href="#put-page" aria-hidden="true">#</a> put_page</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token function">put_page</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> page<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> address<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="do-wp-page" tabindex="-1"><a class="header-anchor" href="#do-wp-page" aria-hidden="true">#</a> do_wp_page</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">do_wp_page</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> error_code<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> address<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="un-wp-page" tabindex="-1"><a class="header-anchor" href="#un-wp-page" aria-hidden="true">#</a> un_wp_page</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">un_wp_page</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token operator">*</span> table_entry<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>作用</strong>: 取消写保护异常，用于页异常中断过程中写保护异常的处理(写时复制)</p><h3 id="do-no-page" tabindex="-1"><a class="header-anchor" href="#do-no-page" aria-hidden="true">#</a> do_no_page</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">do_no_page</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> error_code<span class="token punctuation">,</span><span class="token keyword">unsigned</span> <span class="token keyword">long</span> address<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>作用</strong>: 执行缺页处理</p>`,55),o=[t];function c(l,i){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","Linux-0.11-mm-memory.html.vue"]]);export{u as default};
