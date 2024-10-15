import{_ as e,V as a,W as p,a0 as r}from"./framework-9a29aaa0.js";const o={},i=r('<ul><li><a href="#cs-6824%E7%AC%AC2%E8%AE%B2-rpc-and-threads">cs-6.824第2讲 RPC and Threads</a><ul><li><a href="#%E4%B8%BA%E4%BD%95%E5%9C%A8%E6%9C%AC%E8%AF%BE%E7%A8%8B%E4%B8%AD%E4%BD%BF%E7%94%A8go%E8%AF%AD%E8%A8%80">为何在本课程中使用Go语言？</a></li><li><a href="#%E7%BA%BF%E7%A8%8B">线程</a></li><li><a href="#%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%9A%84%E6%8C%91%E6%88%98">多线程的挑战</a></li></ul></li></ul><h1 id="cs-6-824第2讲-rpc-and-threads" tabindex="-1"><a class="header-anchor" href="#cs-6-824第2讲-rpc-and-threads" aria-hidden="true">#</a> cs-6.824第2讲 RPC and Threads</h1><h2 id="为何在本课程中使用go语言" tabindex="-1"><a class="header-anchor" href="#为何在本课程中使用go语言" aria-hidden="true">#</a> 为何在本课程中使用Go语言？</h2><p>在过去，这门课中一直使用的是C++，其实也能很好的工作，但是现在换成了go语言，有下面一些理由：</p><ul><li><p>对线程、锁及线程间同步有很好支持，有便捷的RPC库。而对于 C++ 等许多语言，找到方便易用的类似工具较困难。</p></li><li><p>类型安全，不会因错误而随机写数据导致程序出现不可预期的操作，能消除很多潜在 bug。</p></li><li><p>内存安全，拥有垃圾回收机制，不会出现两次释放同一块内存或释放仍在使用内存的问题。在非垃圾回收语言如 C++ 中，使用线程时确定最后一个使用共享对象的线程容易出错，程序员需编写大量代码进行手动操作，而 Go 语言的垃圾回收机制使这个问题消失</p></li><li><p>语法简单，比 C++ 简单得多。在 C++ 中，即使是很小的拼写错误，编译器返回的错误信息也复杂到令人费解。你可能都不愿意去看报错信息，而直接去看代码猜测问题。</p></li></ul><p>总结起来就是简单易用，适合教学。</p><p>最后，如果希望深入研究go语言，可以阅读&quot;effective go&quot;。</p><h2 id="线程" tabindex="-1"><a class="header-anchor" href="#线程" aria-hidden="true">#</a> 线程</h2><p>在本门课程中，会非常关注线程，原因在于线程是管理程序并发性的主要工具，在分布式编程中尤为重要。比如一个程序需要与多台其他计算机通信，客户端可能与多个服务器通信，服务器可能同时处理不同客户端的请求。我们需要一种简便的方式实现如&quot;程序有七个不同任务在进行，因为正在和七个不同的客户端进行通讯&quot;这样的功能，线程就是这样的工具。</p><p>在 Go 语言中被称为 go routine（go 协程），它与大家所称的线程类似。理解线程的方式是：一个程序有一个地址空间，在串行程序的地址空间内若没有线程，则只有一个线程执行代码，包括一个程序计数器、一组寄存器和一个栈来描述执行的当前状态。而多线程程序中，每一个线程代表一个独立的程序计数器，有独立的寄存器和栈，以便拥有各自的控制流并在程序不同部分执行，但从技术上讲，尽管每个线程都有自己的栈，它们仍位于同一个地址空间内，不同线程若知道正确地址可以引用对方的栈。 使用线程有以下几个理由：</p><ul><li>I/O concurrency：早期提出这一概念时，当一个线程在等待从磁盘读取数据时，可以启动第二个线程进行计算或在磁盘其他位置读取数据。</li><li>parallelism：利用多核实现并行。对于需要大量 CPU 周期的计算密集型任务，若程序能利用机器上所有核心的 CPU 周期会非常棒。</li><li>convenience：对于周期性执行的程序很方便。</li></ul><p><strong>学生提问：这样的开销值得吗？</strong></p><p>回答：值得。如果你创建了一百万个线程，每个线程都在一个循环中等待一毫秒，然后发送网络消息，这很可能会给你的机器带来巨大的负载。但是如果你创建10个线程，它们休眠1秒后，执行少量工作，这可能完全不是问题。</p><p><strong>学生提问：并发编程和异步编程</strong></p><p>回答：异步编程，其实就是事件驱动编程。在事件驱动程序中，可能会有一个单一的控制线程，它位于一个循环内，等待输入，每当它接收到一个输入，比如一个数据包，它就会判断，这个数据包来源于哪个客户端，然后会它程序内部维护一张表，记录该客户端任何活动状态。例如，它记录了程序读到了文件的某个中间位置。相比较而言，使用多线程编写并发会简单一些，因为你可以编写顺序的代码，而事件驱动编程则需要将活动拆分为一个一个小块。事件编程还存在一个问题，它虽然可以支持IO并发，但是无法支持CPU并行处理。</p><p><strong>学生提问： 线程和进程的区别？</strong></p><p>回答：进程指的是正在运行的程序及其对应的地址空间，在一个进程的内部可以有多个线程。当你编写一个Go程序，运行Go程序会创建一个进程和一块内存区域，随后当go创建了go线程时，这些线程就位于go进程的内部。当你在计算机上运行多个进程，即运行多个程序，例如编辑器或者编译器，操作系统会使得它们互相独立，它们各自有一块内存，并且不能查看彼此的内存。在一个程序内部，你可以使用共享内存，channel和互斥锁。但是进程之间的交互并没有那么容易。</p><p><strong>学生提问： 当发生上下文切换时，它是针对所有线程发生吗？</strong></p><p>不，当发生上下文切换时，它并不一定针对所有线程发生。上下文切换是指操作系统切换 CPU 的执行上下文，包括线程切换和进程切换，它仅针对被操作系统调度选中的线程或进程。具体来说：</p><p>线程上下文切换：在多线程的情况下，操作系统调度器会根据调度策略（如时间片轮转、优先级等），选择某个特定的线程进行切换。也就是说，只有当前正在使用 CPU 的线程会发生上下文切换。其他线程不会受到直接影响，除非它们的调度状态也发生了变化。例如，当一个线程被调度为可运行状态时，它可能会在下一个时间片被调度运行。</p><p>进程上下文切换：如果操作系统决定切换到一个不同的进程，通常会先进行进程上下文切换。切换进程时会更改内存地址空间、页表、文件描述符等。然而，这种切换仍然只影响当前正在使用 CPU 的线程（通常是目标进程的主线程，或者是目标进程中的某个线程）。同样，其他线程仍然不受影响，除非操作系统决定在切换进程后再进一步切换到不同的线程。</p><p>详细说明</p><p>在单 CPU 系统中：只有一个 CPU，因此在任意时刻只会有一个线程在运行。当上下文切换发生时，它只涉及当前正在运行的线程和即将被调度执行的线程。</p><p>在多 CPU / 多核系统中：每个 CPU 核心可以独立调度线程，因此不同核心的线程调度是独立的。某个核心上的上下文切换只会影响当前在该核心上运行的线程，而不会直接影响其他核心上的线程。</p><h2 id="多线程的挑战" tabindex="-1"><a class="header-anchor" href="#多线程的挑战" aria-hidden="true">#</a> 多线程的挑战</h2><p>一个线程创建了对象，它允许其他线程使用该对象。</p><p>21:32</p>',27),l=[i];function n(s,t){return a(),p("div",null,l)}const h=e(o,[["render",n],["__file","lesson2.html.vue"]]);export{h as default};
