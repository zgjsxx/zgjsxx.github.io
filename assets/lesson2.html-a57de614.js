import{_ as e,V as a,W as p,a0 as r}from"./framework-9a29aaa0.js";const o={},i=r('<ul><li><a href="#cs-6824%E7%AC%AC2%E8%AE%B2-rpc-and-threads">cs-6.824第2讲 RPC and Threads</a><ul><li><a href="#%E4%B8%BA%E4%BD%95%E5%9C%A8%E6%9C%AC%E8%AF%BE%E7%A8%8B%E4%B8%AD%E4%BD%BF%E7%94%A8go%E8%AF%AD%E8%A8%80">为何在本课程中使用Go语言？</a></li><li><a href="#%E7%BA%BF%E7%A8%8B">线程</a></li></ul></li></ul><h1 id="cs-6-824第2讲-rpc-and-threads" tabindex="-1"><a class="header-anchor" href="#cs-6-824第2讲-rpc-and-threads" aria-hidden="true">#</a> cs-6.824第2讲 RPC and Threads</h1><h2 id="为何在本课程中使用go语言" tabindex="-1"><a class="header-anchor" href="#为何在本课程中使用go语言" aria-hidden="true">#</a> 为何在本课程中使用Go语言？</h2><p>在过去，这门课中一直使用的是C++，其实也能很好的工作，但是现在换成了go语言，有下面一些理由：</p><ul><li><p>对线程、锁及线程间同步有很好支持，有便捷的RPC库。而对于 C++ 等许多语言，找到方便易用的类似工具较困难。</p></li><li><p>类型安全，不会因错误而随机写数据导致程序出现不可预期的操作，能消除很多潜在 bug。</p></li><li><p>内存安全，拥有垃圾回收机制，不会出现两次释放同一块内存或释放仍在使用内存的问题。在非垃圾回收语言如 C++ 中，使用线程时确定最后一个使用共享对象的线程容易出错，程序员需编写大量代码进行手动操作，而 Go 语言的垃圾回收机制使这个问题消失</p></li><li><p>语法简单，比 C++ 简单得多。在 C++ 中，即使是很小的拼写错误，编译器返回的错误信息也复杂到令人费解。你可能都不愿意去看报错信息，而直接去看代码猜测问题。</p></li></ul><p>总结起来就是简单易用，适合教学。</p><p>最后，如果希望深入研究go语言，可以阅读&quot;effective go&quot;。</p><h2 id="线程" tabindex="-1"><a class="header-anchor" href="#线程" aria-hidden="true">#</a> 线程</h2><p>在这门课中非常关注线程的原因是，线程是我们用来管理程序并发性的主要工具。并发性在分布式编程中尤为重要，因为一个程序需要与多台其他计算机进行通信。一个客户端可能与多个服务器通信，一个服务器可能同时处理不同客户端的请求。</p><p>所以我们需要一种方式来表达，&quot;哦，我的程序实际上有七个不同任务在进行，因为它正在和七个不同的客户端进行通讯&quot;。我希望有一种简便的方法，能让它无需过于复杂的编程，即可实现这七种不同的功能。线程就是这样一个工具。</p><p>go文档中称之为go routine(go协程)，我称之为线程。go routine其实和大家所称的线程是很类似的。</p><p>因此理解线程的方式是， 你拥有一个程序，一个单一的程序，以及一个地址空间。在一个串行程序的地址空间内，若没有线程，则仅有一个线程在该地址空间中执行代码。 一个程序计数器、一组寄存器、一个栈，这些共同描述了执行的当前状态。</p><p>多线程程序，每一条线其实代表一个独立的程序计数器，尤其是在线程同时执行的情况下，尽管它们相互独立。每个线程配备了一组独立的寄存器和栈，以便它们能够拥有各自的控制流，并在程序的不同部分执行各自的线程。</p><p>尽管每个线程都有自己的栈，从技术上讲，它们都位于同一个地址空间内，不同的线程如果知道正确的地址，就可以引用对方的栈。</p><p>I/O concurrency。因为早期提出这一概念时，可能会遇到一个线程正在等待从磁盘读取数据的情况，在等待从磁盘读取数据的同时，希望启动第二个线程，该线程可能进行计算，或者在磁盘的其他位置读取数据。</p><p>parallelism。使用线程的另一个理由是利用多核实现并行。如果有一个需要大量CPU周期的计算密集型任务时，如果能够有一个程序可以利用机器上所有核心的CPU周期，则非常棒。</p><p>convenience。周期性执行的程序。</p><p>学生提问：这样的开销值得吗？</p><p>回答：值得。如果你创建了一百万个线程，每个线程都在一个循环中等待一毫秒，然后发送网络消息，这很可能会给你的机器带来巨大的负载。但是如果你创建10个线程，它们休眠1秒后，执行少量工作，这可能完全不是问题。</p><p>11： 02</p>',20),l=[i];function c(n,t){return a(),p("div",null,l)}const d=e(o,[["render",c],["__file","lesson2.html.vue"]]);export{d as default};
