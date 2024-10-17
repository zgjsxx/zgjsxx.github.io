import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<ul><li><a href="#cs-6824%E7%AC%AC2%E8%AE%B2-rpc-and-threads">cs-6.824第2讲 RPC and Threads</a><ul><li><a href="#%E4%B8%BA%E4%BD%95%E5%9C%A8%E6%9C%AC%E8%AF%BE%E7%A8%8B%E4%B8%AD%E4%BD%BF%E7%94%A8go%E8%AF%AD%E8%A8%80">为何在本课程中使用Go语言？</a></li><li><a href="#%E7%BA%BF%E7%A8%8B">线程</a></li><li><a href="#%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%9A%84%E6%8C%91%E6%88%98">多线程的挑战</a><ul><li><a href="#%E7%AB%9E%E4%BA%89">竞争</a></li><li><a href="#%E5%8D%8F%E4%BD%9Ccoordination">协作(Coordination)</a></li><li><a href="#%E5%AE%9E%E9%99%85%E6%A1%88%E4%BE%8B">实际案例</a></li></ul></li></ul></li></ul><h1 id="cs-6-824第2讲-rpc-and-threads" tabindex="-1"><a class="header-anchor" href="#cs-6-824第2讲-rpc-and-threads" aria-hidden="true">#</a> cs-6.824第2讲 RPC and Threads</h1><h2 id="为何在本课程中使用go语言" tabindex="-1"><a class="header-anchor" href="#为何在本课程中使用go语言" aria-hidden="true">#</a> 为何在本课程中使用Go语言？</h2><p>在过去，这门课中一直使用的是C++，其实也能很好的工作，但是现在换成了go语言，有下面一些理由：</p><ul><li><p>对线程、锁及线程间同步有很好支持，有便捷的RPC库。而对于 C++ 等许多语言，找到方便易用的类似工具较困难。</p></li><li><p>类型安全，不会因错误而随机写数据导致程序出现不可预期的操作，能消除很多潜在 bug。</p></li><li><p>内存安全，拥有垃圾回收机制，不会出现两次释放同一块内存或释放仍在使用内存的问题。在非垃圾回收语言如 C++ 中，使用线程时确定最后一个使用共享对象的线程容易出错，程序员需编写大量代码进行手动操作，而 Go 语言的垃圾回收机制使这个问题消失</p></li><li><p>语法简单，比 C++ 简单得多。在 C++ 中，即使是很小的拼写错误，编译器返回的错误信息也复杂到令人费解。你可能都不愿意去看报错信息，而直接去看代码猜测问题。</p></li></ul><p>总结起来就是简单易用，适合教学。</p><p>最后，如果希望深入研究go语言，可以阅读&quot;effective go&quot;。</p><h2 id="线程" tabindex="-1"><a class="header-anchor" href="#线程" aria-hidden="true">#</a> 线程</h2><p>在本门课程中，会非常关注线程，原因在于线程是管理程序并发性的主要工具，在分布式编程中尤为重要。比如一个程序需要与多台其他计算机通信，客户端可能与多个服务器通信，服务器可能同时处理不同客户端的请求。我们需要一种简便的方式实现如&quot;程序有七个不同任务在进行，因为正在和七个不同的客户端进行通讯&quot;这样的功能，线程就是这样的工具。</p><p>在 Go 语言中被称为 go routine（go 协程），它与大家所称的线程类似。理解线程的方式是：一个程序有一个地址空间，在串行程序的地址空间内若没有线程，则只有一个线程执行代码，包括一个程序计数器、一组寄存器和一个栈来描述执行的当前状态。而多线程程序中，每一个线程代表一个独立的程序计数器，有独立的寄存器和栈，以便拥有各自的控制流并在程序不同部分执行，但从技术上讲，尽管每个线程都有自己的栈，它们仍位于同一个地址空间内，不同线程若知道正确地址可以引用对方的栈。 使用线程有以下几个理由：</p><ul><li>I/O concurrency：早期提出这一概念时，当一个线程在等待从磁盘读取数据时，可以启动第二个线程进行计算或在磁盘其他位置读取数据。</li><li>parallelism：利用多核实现并行。对于需要大量 CPU 周期的计算密集型任务，若程序能利用机器上所有核心的 CPU 周期会非常棒。</li><li>convenience：对于周期性执行的程序很方便。</li></ul><p><strong>学生提问：这样的开销值得吗？</strong></p><p>回答：值得。如果你创建了一百万个线程，每个线程都在一个循环中等待一毫秒，然后发送网络消息，这很可能会给你的机器带来巨大的负载。但是如果你创建10个线程，它们休眠1秒后，执行少量工作，这可能完全不是问题。</p><p><strong>学生提问：并发编程和异步编程</strong></p><p>回答：异步编程，其实就是事件驱动编程。在事件驱动程序中，可能会有一个单一的控制线程，它位于一个循环内，等待输入，每当它接收到一个输入，比如一个数据包，它就会判断，这个数据包来源于哪个客户端，然后会它程序内部维护一张表，记录该客户端任何活动状态。例如，它记录了程序读到了文件的某个中间位置。相比较而言，使用多线程编写并发会简单一些，因为你可以编写顺序的代码，而事件驱动编程则需要将活动拆分为一个一个小块。事件编程还存在一个问题，它虽然可以支持IO并发，但是无法支持CPU并行处理。</p><p><strong>学生提问： 线程和进程的区别？</strong></p><p>回答：进程指的是正在运行的程序及其对应的地址空间，在一个进程的内部可以有多个线程。当你编写一个Go程序，运行Go程序会创建一个进程和一块内存区域，随后当go创建了go线程时，这些线程就位于go进程的内部。当你在计算机上运行多个进程，即运行多个程序，例如编辑器或者编译器，操作系统会使得它们互相独立，它们各自有一块内存，并且不能查看彼此的内存。在一个程序内部，你可以使用共享内存，channel和互斥锁。但是进程之间的交互并没有那么容易。</p><p><strong>学生提问： 当发生上下文切换时，它是针对所有线程发生吗？</strong></p><p>不，当发生上下文切换时，它并不一定针对所有线程发生。上下文切换是指操作系统切换 CPU 的执行上下文，包括线程切换和进程切换，它仅针对被操作系统调度选中的线程或进程。具体来说：</p><p>线程上下文切换：在多线程的情况下，操作系统调度器会根据调度策略（如时间片轮转、优先级等），选择某个特定的线程进行切换。也就是说，只有当前正在使用 CPU 的线程会发生上下文切换。其他线程不会受到直接影响，除非它们的调度状态也发生了变化。例如，当一个线程被调度为可运行状态时，它可能会在下一个时间片被调度运行。</p><p>进程上下文切换：如果操作系统决定切换到一个不同的进程，通常会先进行进程上下文切换。切换进程时会更改内存地址空间、页表、文件描述符等。然而，这种切换仍然只影响当前正在使用 CPU 的线程（通常是目标进程的主线程，或者是目标进程中的某个线程）。同样，其他线程仍然不受影响，除非操作系统决定在切换进程后再进一步切换到不同的线程。</p><p>详细说明</p><p>在单 CPU 系统中：只有一个 CPU，因此在任意时刻只会有一个线程在运行。当上下文切换发生时，它只涉及当前正在运行的线程和即将被调度执行的线程。</p><p>在多 CPU / 多核系统中：每个 CPU 核心可以独立调度线程，因此不同核心的线程调度是独立的。某个核心上的上下文切换只会影响当前在该核心上运行的线程，而不会直接影响其他核心上的线程。</p><h2 id="多线程的挑战" tabindex="-1"><a class="header-anchor" href="#多线程的挑战" aria-hidden="true">#</a> 多线程的挑战</h2><h3 id="竞争" tabindex="-1"><a class="header-anchor" href="#竞争" aria-hidden="true">#</a> 竞争</h3><p>一个线程创建了对象，它允许其他线程使用该对象。在线程之间共享数据是需要小心的。</p><p>一个典型的例子是，假设你有一个全局变量n, 它在不同的线程之间共享，每个线程都会去对n进行自增。如果不进行处理，则容易引入bug。对于<code>n = n + 1</code>这样一个简单的操作，在机器层面可能会拆分为几个步骤，首先将n加载到寄存器中，然后将寄存器的值加1，将寄存器的值存到n中。如果两个线程同时加载了n到寄存器中，这意味着，假设n的初始值是0，那么两者均加载了0到寄存器中，然后两者均进行自增得到1，两者再将1写回到n中，最终n的值将会是1。</p><p>学生提问：每一行汇编指令是否是原子的呢？</p><p>回答：不是，要根据具体的指令和处理器架构来进行判断。例如自增指令，即对某个内存位置进行增量操作，大概率不是原子的。</p><p>上面所提到的例子是一个常见的多线程竞争的场景，称之为竞争条件(race condition)。</p><p>解决上述问题最简单的方法就是锁机制。在Go语言中，称之为Mutex，mutex通常按照下面的模式进行。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
n<span class="token operator">=</span>n<span class="token operator">+</span><span class="token number">1</span>
mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样无论哪些线程执行此操作，幸运地获得了锁的线程得以完成所有这些任务，另一个线程则可以继续。</p><p>锁使得多步骤的代码序列可以被视为具有原子性。</p><p>学生提问: go如何知道我们要锁定哪些变量的?</p><p>回答： 互斥锁并不关心程序员定义了哪些变量要进行锁定。一个线程获取锁之后，其余线程需要等待，这就是锁的核心。</p><p>学生提问： 将锁置于一个数据结构内部是否是好的。</p><p>回答：如果定义了一个需要加锁的数据结构，那么将锁至于数据结构内部，使该数据结构的每个方法负责获取锁，使用该数据结构的用户可能毫不知情。这是很合理的。</p><p>但是也有有不好的方面：如果程序员知道他的数据不会被共享，那可能会造成一些性能损失。另一方面，如果两个数据结构有依赖关系，各自带有锁，且它们可能互相使用，则可能带来死锁。 死锁的解决往往需要将锁从具体实现中抽离，提升至调用代码层面。总之，隐藏锁可能是一个好主意，但并不总是如此。</p><h3 id="协作-coordination" tabindex="-1"><a class="header-anchor" href="#协作-coordination" aria-hidden="true">#</a> 协作(Coordination)</h3><p>多线程之间并不是只存在竞争这样的场景，有些时候，是希望不同的线程之间可以相互协作。例如B线程等待A线程产生一些数据，然后进行读取。</p><p>在go语言中， 通道channels， 条件变量condition， 等待组(waitGroup)是常用的协作工具。</p><h3 id="实际案例" tabindex="-1"><a class="header-anchor" href="#实际案例" aria-hidden="true">#</a> 实际案例</h3><p>接下来以网络爬虫为例，探讨一些关于线程的内容。</p><p>关于爬虫，需要注意避免两次获取同一个页面。</p><p>同时对于不同的页面应该需要进行并发获取。</p><p>串行爬虫</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;sync&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">//</span>
<span class="token comment">// Several solutions to the crawler exercise from the Go tutorial</span>
<span class="token comment">// https://tour.golang.org/concurrency/10</span>
<span class="token comment">//</span>

<span class="token comment">//</span>
<span class="token comment">// Serial crawler</span>
<span class="token comment">//</span>

<span class="token keyword">func</span> <span class="token function">Serial</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">,</span> fetcher Fetcher<span class="token punctuation">,</span> fetched <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> fetched<span class="token punctuation">[</span>url<span class="token punctuation">]</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fetched<span class="token punctuation">[</span>url<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
	urls<span class="token punctuation">,</span> err <span class="token operator">:=</span> fetcher<span class="token punctuation">.</span><span class="token function">Fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> u <span class="token operator">:=</span> <span class="token keyword">range</span> urls <span class="token punctuation">{</span>
		<span class="token function">Serial</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> fetcher<span class="token punctuation">,</span> fetched<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token comment">//</span>
<span class="token comment">// Concurrent crawler with shared state and Mutex</span>
<span class="token comment">//</span>

<span class="token keyword">type</span> fetchState <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	mu      sync<span class="token punctuation">.</span>Mutex
	fetched <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">bool</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ConcurrentMutex</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">,</span> fetcher Fetcher<span class="token punctuation">,</span> f <span class="token operator">*</span>fetchState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	f<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	already <span class="token operator">:=</span> f<span class="token punctuation">.</span>fetched<span class="token punctuation">[</span>url<span class="token punctuation">]</span>
	f<span class="token punctuation">.</span>fetched<span class="token punctuation">[</span>url<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
	f<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> already <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	urls<span class="token punctuation">,</span> err <span class="token operator">:=</span> fetcher<span class="token punctuation">.</span><span class="token function">Fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> done sync<span class="token punctuation">.</span>WaitGroup
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> u <span class="token operator">:=</span> <span class="token keyword">range</span> urls <span class="token punctuation">{</span>
		done<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    u2 <span class="token operator">:=</span> u
		<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">defer</span> done<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			<span class="token function">ConcurrentMutex</span><span class="token punctuation">(</span>u2<span class="token punctuation">,</span> fetcher<span class="token punctuation">,</span> f<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token comment">//go func(u string) {</span>
		<span class="token comment">//	defer done.Done()</span>
		<span class="token comment">//	ConcurrentMutex(u, fetcher, f)</span>
		<span class="token comment">//}(u)</span>
	<span class="token punctuation">}</span>
	done<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">makeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>fetchState <span class="token punctuation">{</span>
	f <span class="token operator">:=</span> <span class="token operator">&amp;</span>fetchState<span class="token punctuation">{</span><span class="token punctuation">}</span>
	f<span class="token punctuation">.</span>fetched <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> f
<span class="token punctuation">}</span>

<span class="token comment">//</span>
<span class="token comment">// Concurrent crawler with channels</span>
<span class="token comment">//</span>

<span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">,</span> ch <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> fetcher Fetcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	urls<span class="token punctuation">,</span> err <span class="token operator">:=</span> fetcher<span class="token punctuation">.</span><span class="token function">Fetch</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		ch <span class="token operator">&lt;-</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		ch <span class="token operator">&lt;-</span> urls
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">master</span><span class="token punctuation">(</span>ch <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> fetcher Fetcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	n <span class="token operator">:=</span> <span class="token number">1</span>
	fetched <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> urls <span class="token operator">:=</span> <span class="token keyword">range</span> ch <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> u <span class="token operator">:=</span> <span class="token keyword">range</span> urls <span class="token punctuation">{</span>
			<span class="token keyword">if</span> fetched<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token boolean">false</span> <span class="token punctuation">{</span>
				fetched<span class="token punctuation">[</span>u<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
				n <span class="token operator">+=</span> <span class="token number">1</span>
				<span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>u<span class="token punctuation">,</span> ch<span class="token punctuation">,</span> fetcher<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		n <span class="token operator">-=</span> <span class="token number">1</span>
		<span class="token keyword">if</span> n <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			<span class="token keyword">break</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">ConcurrentChannel</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">,</span> fetcher Fetcher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ch <span class="token operator">&lt;-</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>url<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">master</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> fetcher<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//</span>
<span class="token comment">// main</span>
<span class="token comment">//</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;=== Serial===\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token function">Serial</span><span class="token punctuation">(</span><span class="token string">&quot;http://golang.org/&quot;</span><span class="token punctuation">,</span> fetcher<span class="token punctuation">,</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;=== ConcurrentMutex ===\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token function">ConcurrentMutex</span><span class="token punctuation">(</span><span class="token string">&quot;http://golang.org/&quot;</span><span class="token punctuation">,</span> fetcher<span class="token punctuation">,</span> <span class="token function">makeState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;=== ConcurrentChannel ===\\n&quot;</span><span class="token punctuation">)</span>
	<span class="token function">ConcurrentChannel</span><span class="token punctuation">(</span><span class="token string">&quot;http://golang.org/&quot;</span><span class="token punctuation">,</span> fetcher<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//</span>
<span class="token comment">// Fetcher</span>
<span class="token comment">//</span>

<span class="token keyword">type</span> Fetcher <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token comment">// Fetch returns a slice of URLs found on the page.</span>
	<span class="token function">Fetch</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>urls <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// fakeFetcher is Fetcher that returns canned results.</span>
<span class="token keyword">type</span> fakeFetcher <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>fakeResult

<span class="token keyword">type</span> fakeResult <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	body <span class="token builtin">string</span>
	urls <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>f fakeFetcher<span class="token punctuation">)</span> <span class="token function">Fetch</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> res<span class="token punctuation">,</span> ok <span class="token operator">:=</span> f<span class="token punctuation">[</span>url<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;found:   %s\\n&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
		<span class="token keyword">return</span> res<span class="token punctuation">.</span>urls<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;missing: %s\\n&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;not found: %s&quot;</span><span class="token punctuation">,</span> url<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// fetcher is a populated fakeFetcher.</span>
<span class="token keyword">var</span> fetcher <span class="token operator">=</span> fakeFetcher<span class="token punctuation">{</span>
	<span class="token string">&quot;http://golang.org/&quot;</span><span class="token punctuation">:</span> <span class="token operator">&amp;</span>fakeResult<span class="token punctuation">{</span>
		<span class="token string">&quot;The Go Programming Language&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
			<span class="token string">&quot;http://golang.org/pkg/&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;http://golang.org/cmd/&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token string">&quot;http://golang.org/pkg/&quot;</span><span class="token punctuation">:</span> <span class="token operator">&amp;</span>fakeResult<span class="token punctuation">{</span>
		<span class="token string">&quot;Packages&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
			<span class="token string">&quot;http://golang.org/&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;http://golang.org/cmd/&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;http://golang.org/pkg/fmt/&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;http://golang.org/pkg/os/&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token string">&quot;http://golang.org/pkg/fmt/&quot;</span><span class="token punctuation">:</span> <span class="token operator">&amp;</span>fakeResult<span class="token punctuation">{</span>
		<span class="token string">&quot;Package fmt&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
			<span class="token string">&quot;http://golang.org/&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;http://golang.org/pkg/&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token string">&quot;http://golang.org/pkg/os/&quot;</span><span class="token punctuation">:</span> <span class="token operator">&amp;</span>fakeResult<span class="token punctuation">{</span>
		<span class="token string">&quot;Package os&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
			<span class="token string">&quot;http://golang.org/&quot;</span><span class="token punctuation">,</span>
			<span class="token string">&quot;http://golang.org/pkg/&quot;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>学生提问： 锁和对象必须要绑定在一起吗?</p><p>回答：不是</p><p>学生提问： 引用传递或值传递的规则是什么?</p><p>在 Go 语言中，map本质上是一个指针，类型是引用类型，即传递的是引用，而不是值的副本。这意味着当一个 map 被传递到一个函数或被赋值给另一个变量时，实际上传递的是对同一底层数据的引用，而不是数据的副本。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token comment">// 修改 map 的值</span>
<span class="token keyword">func</span> <span class="token function">modifyMap</span><span class="token punctuation">(</span>m <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    m<span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">100</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化 map</span>
    originalMap <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Before modifying:&quot;</span><span class="token punctuation">,</span> originalMap<span class="token punctuation">)</span>

    <span class="token comment">// 传递 map 给函数</span>
    <span class="token function">modifyMap</span><span class="token punctuation">(</span>originalMap<span class="token punctuation">)</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;After modifying:&quot;</span><span class="token punctuation">,</span> originalMap<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而string则是一个值类型。</p><p>学生提问： 如果go线程失败了，无法达到waitGroup怎么办？</p><p>回答： 使用defer操作，确保Done()被执行。</p><p>学生提问： 为什么waitGroup的Done操作无需加锁</p><p>回答：其内部必然有互斥锁或者类似的机制进行保护。</p><p>学生提问： 第56行的u能否不用传参</p><p>回答：不可以</p><p>如果ConcurrentMutex这里去掉锁，会怎么样？</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">ConcurrentMutex</span><span class="token punctuation">(</span>url <span class="token builtin">string</span><span class="token punctuation">,</span> fetcher Fetcher<span class="token punctuation">,</span> f <span class="token operator">*</span>fetchState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// f.mu.Lock()</span>
	already <span class="token operator">:=</span> f<span class="token punctuation">.</span>fetched<span class="token punctuation">[</span>url<span class="token punctuation">]</span>
	f<span class="token punctuation">.</span>fetched<span class="token punctuation">[</span>url<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
	<span class="token comment">// f.mu.Unlock()</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用--race来检测多线程之间的竞争。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> run <span class="token operator">--</span>race crawler<span class="token punctuation">.</span><span class="token keyword">go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其原理是使用影子内存。</p><p>回答：如果未执行某些代码，那么竞态检测器对此一无所知。它并非是一种静态检测，它实际上是观察这个特定程序运行时的发生情况。如果该程序此次运行没有执行读写共享数据耳朵相关代码，那么竞态检测器将无从得知代码可能存在竞态条件。</p><p>最后一种方式是基于go channel。其思路是启动一个worker线程，在其页面抓取完整之后，通过channel将页面的url发送给master线程。master则从channel中获取url，然后启动worker线程进行获取。</p><p>这种方式下，master线程和worker线程不共享任何对象，我们不需要担心关于锁的问题。</p><p>学生提问：</p><p>回答：ch是一个通道，通道具有发送和接受功能。channel的内部必然有互斥锁。</p><p>学生提问：第89行是一个循环，如果worker程序速度过慢，还没有来得急把url塞到channel中，那么程序就会提前退出，这如何解决。</p><p>回答： 第89行的循环，当channel没有数据时，会一直阻塞，不会直接跳出循环。</p>`,73),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","lesson2.html.vue"]]);export{r as default};
