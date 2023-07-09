import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<h1 id="workflow-线程池分析" tabindex="-1"><a class="header-anchor" href="#workflow-线程池分析" aria-hidden="true">#</a> workflow 线程池分析</h1><p>msgqueue.h</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
  Copyright (c) 2020 Sogou, Inc.

  Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  Author: Xie Han (xiehan@sogou-inc.com)
*/</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">_MSGQUEUE_H_</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_MSGQUEUE_H_</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stddef.h&gt;</span></span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">__msgqueue</span> <span class="token class-name">msgqueue_t</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token keyword">extern</span> <span class="token string">&quot;C&quot;</span>
<span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token comment">/* A simple implementation of message queue. The max pending messages may
 * reach two times &#39;maxlen&#39; when the queue is in blocking mode, and infinite
 * in nonblocking mode. &#39;linkoff&#39; is the offset from the head of each message,
 * where spaces of one pointer size should be available for internal usage.
 * &#39;linkoff&#39; can be positive or negative or zero. */</span>

<span class="token class-name">msgqueue_t</span> <span class="token operator">*</span><span class="token function">msgqueue_create</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> maxlen<span class="token punctuation">,</span> <span class="token keyword">int</span> linkoff<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">msgqueue_put</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>msg<span class="token punctuation">,</span> <span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">msgqueue_get</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">msgqueue_set_nonblock</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">msgqueue_set_block</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">msgqueue_destroy</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>msgqueue.c</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
  Copyright (c) 2020 Sogou, Inc.

  Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  Author: Xie Han (xiehan@sogou-inc.com)
*/</span>

<span class="token comment">/*
 * This message queue originates from the project of Sogou C++ Workflow:
 * https://github.com/sogou/workflow
 *
 * The idea of this implementation is quite simple and obvious. When the
 * get_list is not empty, the consumer takes a message. Otherwise the consumer
 * waits till put_list is not empty, and swap two lists. This method performs
 * well when the queue is very busy, and the number of consumers is big.
 */</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;errno.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;msgqueue.h&quot;</span></span>

<span class="token keyword">struct</span> <span class="token class-name">__msgqueue</span>
<span class="token punctuation">{</span>
	<span class="token class-name">size_t</span> msg_max<span class="token punctuation">;</span>
	<span class="token class-name">size_t</span> msg_cnt<span class="token punctuation">;</span>
	<span class="token keyword">int</span> linkoff<span class="token punctuation">;</span>
	<span class="token keyword">int</span> nonblock<span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>head1<span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>head2<span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>get_head<span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>put_head<span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>put_tail<span class="token punctuation">;</span>
	<span class="token class-name">pthread_mutex_t</span> get_mutex<span class="token punctuation">;</span>
	<span class="token class-name">pthread_mutex_t</span> put_mutex<span class="token punctuation">;</span>
	<span class="token class-name">pthread_cond_t</span> get_cond<span class="token punctuation">;</span>
	<span class="token class-name">pthread_cond_t</span> put_cond<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">msgqueue_set_nonblock</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	queue<span class="token operator">-&gt;</span>nonblock <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">pthread_cond_signal</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_cond<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">pthread_cond_broadcast</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_cond<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">msgqueue_set_block</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	queue<span class="token operator">-&gt;</span>nonblock <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token class-name">size_t</span> <span class="token function">__msgqueue_swap</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>get_head <span class="token operator">=</span> queue<span class="token operator">-&gt;</span>get_head<span class="token punctuation">;</span>
	<span class="token class-name">size_t</span> cnt<span class="token punctuation">;</span>

	queue<span class="token operator">-&gt;</span>get_head <span class="token operator">=</span> queue<span class="token operator">-&gt;</span>put_head<span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token operator">-&gt;</span>msg_cnt <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>queue<span class="token operator">-&gt;</span>nonblock<span class="token punctuation">)</span>
		<span class="token function">pthread_cond_wait</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_cond<span class="token punctuation">,</span> <span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>

	cnt <span class="token operator">=</span> queue<span class="token operator">-&gt;</span>msg_cnt<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>cnt <span class="token operator">&gt;</span> queue<span class="token operator">-&gt;</span>msg_max <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span>
		<span class="token function">pthread_cond_broadcast</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_cond<span class="token punctuation">)</span><span class="token punctuation">;</span>

	queue<span class="token operator">-&gt;</span>put_head <span class="token operator">=</span> get_head<span class="token punctuation">;</span>
	queue<span class="token operator">-&gt;</span>put_tail <span class="token operator">=</span> get_head<span class="token punctuation">;</span>
	queue<span class="token operator">-&gt;</span>msg_cnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> cnt<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">msgqueue_put</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>msg<span class="token punctuation">,</span> <span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span>link <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span>msg <span class="token operator">+</span> queue<span class="token operator">-&gt;</span>linkoff<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token operator">*</span>link <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token operator">-&gt;</span>msg_cnt <span class="token operator">&gt;</span> queue<span class="token operator">-&gt;</span>msg_max <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>queue<span class="token operator">-&gt;</span>nonblock<span class="token punctuation">)</span>
		<span class="token function">pthread_cond_wait</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_cond<span class="token punctuation">,</span> <span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token operator">*</span>queue<span class="token operator">-&gt;</span>put_tail <span class="token operator">=</span> link<span class="token punctuation">;</span>
	queue<span class="token operator">-&gt;</span>put_tail <span class="token operator">=</span> link<span class="token punctuation">;</span>
	queue<span class="token operator">-&gt;</span>msg_cnt<span class="token operator">++</span><span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">pthread_cond_signal</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_cond<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">msgqueue_get</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>msg<span class="token punctuation">;</span>

	<span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">*</span>queue<span class="token operator">-&gt;</span>get_head <span class="token operator">||</span> <span class="token function">__msgqueue_swap</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		msg <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">*</span>queue<span class="token operator">-&gt;</span>get_head <span class="token operator">-</span> queue<span class="token operator">-&gt;</span>linkoff<span class="token punctuation">;</span>
		<span class="token operator">*</span>queue<span class="token operator">-&gt;</span>get_head <span class="token operator">=</span> <span class="token operator">*</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">*</span>queue<span class="token operator">-&gt;</span>get_head<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">else</span>
	<span class="token punctuation">{</span>
		msg <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
		errno <span class="token operator">=</span> ENOENT<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> msg<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">msgqueue_t</span> <span class="token operator">*</span><span class="token function">msgqueue_create</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> maxlen<span class="token punctuation">,</span> <span class="token keyword">int</span> linkoff<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span> <span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> ret<span class="token punctuation">;</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	ret <span class="token operator">=</span> <span class="token function">pthread_mutex_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_mutex<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		ret <span class="token operator">=</span> <span class="token function">pthread_mutex_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			ret <span class="token operator">=</span> <span class="token function">pthread_cond_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_cond<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				ret <span class="token operator">=</span> <span class="token function">pthread_cond_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_cond<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					queue<span class="token operator">-&gt;</span>msg_max <span class="token operator">=</span> maxlen<span class="token punctuation">;</span>
					queue<span class="token operator">-&gt;</span>linkoff <span class="token operator">=</span> linkoff<span class="token punctuation">;</span>
					queue<span class="token operator">-&gt;</span>head1 <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
					queue<span class="token operator">-&gt;</span>head2 <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
					queue<span class="token operator">-&gt;</span>get_head <span class="token operator">=</span> <span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>head1<span class="token punctuation">;</span>
					queue<span class="token operator">-&gt;</span>put_head <span class="token operator">=</span> <span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>head2<span class="token punctuation">;</span>
					queue<span class="token operator">-&gt;</span>put_tail <span class="token operator">=</span> <span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>head2<span class="token punctuation">;</span>
					queue<span class="token operator">-&gt;</span>msg_cnt <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
					queue<span class="token operator">-&gt;</span>nonblock <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
					<span class="token keyword">return</span> queue<span class="token punctuation">;</span>
				<span class="token punctuation">}</span>

				<span class="token function">pthread_cond_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_cond<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>

			<span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	errno <span class="token operator">=</span> ret<span class="token punctuation">;</span>
	<span class="token function">free</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">msgqueue_destroy</span><span class="token punctuation">(</span><span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>queue<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token function">pthread_cond_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_cond<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">pthread_cond_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_cond<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>put_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>queue<span class="token operator">-&gt;</span>get_mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">free</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>thrdpool.h</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
  Copyright (c) 2019 Sogou, Inc.

  Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  Author: Xie Han (xiehan@sogou-inc.com)
*/</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">_THRDPOOL_H_</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_THRDPOOL_H_</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stddef.h&gt;</span></span>

<span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">__thrdpool</span> <span class="token class-name">thrdpool_t</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">thrdpool_task</span>
<span class="token punctuation">{</span>
	<span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>routine<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>context<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token keyword">extern</span> <span class="token string">&quot;C&quot;</span>
<span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token comment">/*
 * Thread pool originates from project Sogou C++ Workflow
 * https://github.com/sogou/workflow
 *
 * A thread task can be scheduled by another task, which is very important,
 * even if the pool is being destroyed. Because thread task is hard to know
 * what&#39;s happening to the pool.
 * The thread pool can also be destroyed by a thread task. This may sound
 * strange, but it&#39;s very logical. Destroying thread pool in thread task
 * does not end the task thread. It&#39;ll run till the end of task.
 */</span>

<span class="token class-name">thrdpool_t</span> <span class="token operator">*</span><span class="token function">thrdpool_create</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> nthreads<span class="token punctuation">,</span> <span class="token class-name">size_t</span> stacksize<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">thrdpool_schedule</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">thrdpool_task</span> <span class="token operator">*</span>task<span class="token punctuation">,</span> <span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">thrdpool_increase</span><span class="token punctuation">(</span><span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">thrdpool_in_pool</span><span class="token punctuation">(</span><span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">void</span> <span class="token function">thrdpool_destroy</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>pending<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">thrdpool_task</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
					  <span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>thrdpool.c</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">/*
  Copyright (c) 2019 Sogou, Inc.

  Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  Author: Xie Han (xiehan@sogou-inc.com)
*/</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;errno.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;msgqueue.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;thrdpool.h&quot;</span></span>

<span class="token keyword">struct</span> <span class="token class-name">__thrdpool</span>
<span class="token punctuation">{</span>
	<span class="token class-name">msgqueue_t</span> <span class="token operator">*</span>msgqueue<span class="token punctuation">;</span>
	<span class="token class-name">size_t</span> nthreads<span class="token punctuation">;</span>
	<span class="token class-name">size_t</span> stacksize<span class="token punctuation">;</span>
	<span class="token class-name">pthread_t</span> tid<span class="token punctuation">;</span>
	<span class="token class-name">pthread_mutex_t</span> mutex<span class="token punctuation">;</span>
	<span class="token class-name">pthread_key_t</span> key<span class="token punctuation">;</span>
	<span class="token class-name">pthread_cond_t</span> <span class="token operator">*</span>terminate<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">__thrdpool_task_entry</span>
<span class="token punctuation">{</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>link<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">thrdpool_task</span> task<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token class-name">pthread_t</span> __zero_tid<span class="token punctuation">;</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">__thrdpool_routine</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">thrdpool_t</span> <span class="token operator">*</span><span class="token punctuation">)</span>arg<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">__thrdpool_task_entry</span> <span class="token operator">*</span>entry<span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>task_routine<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>task_context<span class="token punctuation">;</span>
	<span class="token class-name">pthread_t</span> tid<span class="token punctuation">;</span>

	<span class="token function">pthread_setspecific</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>key<span class="token punctuation">,</span> pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>pool<span class="token operator">-&gt;</span>terminate<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		entry <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">__thrdpool_task_entry</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">msgqueue_get</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>msgqueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>entry<span class="token punctuation">)</span>
			<span class="token keyword">break</span><span class="token punctuation">;</span>

		task_routine <span class="token operator">=</span> entry<span class="token operator">-&gt;</span>task<span class="token punctuation">.</span>routine<span class="token punctuation">;</span>
		task_context <span class="token operator">=</span> entry<span class="token operator">-&gt;</span>task<span class="token punctuation">.</span>context<span class="token punctuation">;</span>
		<span class="token function">free</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">task_routine</span><span class="token punctuation">(</span>task_context<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>nthreads <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">/* Thread pool was destroyed by the task. */</span>
			<span class="token function">free</span><span class="token punctuation">(</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token comment">/* One thread joins another. Don&#39;t need to keep all thread IDs. */</span>
	<span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	tid <span class="token operator">=</span> pool<span class="token operator">-&gt;</span>tid<span class="token punctuation">;</span>
	pool<span class="token operator">-&gt;</span>tid <span class="token operator">=</span> <span class="token function">pthread_self</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">--</span>pool<span class="token operator">-&gt;</span>nthreads <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token function">pthread_cond_signal</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>terminate<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">memcmp</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid<span class="token punctuation">,</span> <span class="token operator">&amp;</span>__zero_tid<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> <span class="token punctuation">(</span><span class="token class-name">pthread_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token function">pthread_join</span><span class="token punctuation">(</span>tid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">__thrdpool_terminate</span><span class="token punctuation">(</span><span class="token keyword">int</span> in_pool<span class="token punctuation">,</span> <span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token class-name">pthread_cond_t</span> term <span class="token operator">=</span> PTHREAD_COND_INITIALIZER<span class="token punctuation">;</span>

	<span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">msgqueue_set_nonblock</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>msgqueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
	pool<span class="token operator">-&gt;</span>terminate <span class="token operator">=</span> <span class="token operator">&amp;</span>term<span class="token punctuation">;</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span>in_pool<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token comment">/* Thread pool destroyed in a pool thread is legal. */</span>
		<span class="token function">pthread_detach</span><span class="token punctuation">(</span><span class="token function">pthread_self</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		pool<span class="token operator">-&gt;</span>nthreads<span class="token operator">--</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">while</span> <span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>nthreads <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token function">pthread_cond_wait</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>term<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">memcmp</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>tid<span class="token punctuation">,</span> <span class="token operator">&amp;</span>__zero_tid<span class="token punctuation">,</span> <span class="token keyword">sizeof</span> <span class="token punctuation">(</span><span class="token class-name">pthread_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token function">pthread_join</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>tid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">__thrdpool_create_threads</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> nthreads<span class="token punctuation">,</span> <span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token class-name">pthread_attr_t</span> attr<span class="token punctuation">;</span>
	<span class="token class-name">pthread_t</span> tid<span class="token punctuation">;</span>
	<span class="token keyword">int</span> ret<span class="token punctuation">;</span>

	ret <span class="token operator">=</span> <span class="token function">pthread_attr_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>stacksize<span class="token punctuation">)</span>
			<span class="token function">pthread_attr_setstacksize</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> pool<span class="token operator">-&gt;</span>stacksize<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">while</span> <span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>nthreads <span class="token operator">&lt;</span> nthreads<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			ret <span class="token operator">=</span> <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid<span class="token punctuation">,</span> <span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> __thrdpool_routine<span class="token punctuation">,</span> pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
				pool<span class="token operator">-&gt;</span>nthreads<span class="token operator">++</span><span class="token punctuation">;</span>
			<span class="token keyword">else</span>
				<span class="token keyword">break</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token function">pthread_attr_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>nthreads <span class="token operator">==</span> nthreads<span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>

		<span class="token function">__thrdpool_terminate</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	errno <span class="token operator">=</span> ret<span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">thrdpool_t</span> <span class="token operator">*</span><span class="token function">thrdpool_create</span><span class="token punctuation">(</span><span class="token class-name">size_t</span> nthreads<span class="token punctuation">,</span> <span class="token class-name">size_t</span> stacksize<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">;</span>
	<span class="token keyword">int</span> ret<span class="token punctuation">;</span>

	pool <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">thrdpool_t</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span> <span class="token punctuation">(</span><span class="token class-name">thrdpool_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pool<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>

	pool<span class="token operator">-&gt;</span>msgqueue <span class="token operator">=</span> <span class="token function">msgqueue_create</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">size_t</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>msgqueue<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		ret <span class="token operator">=</span> <span class="token function">pthread_mutex_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			ret <span class="token operator">=</span> <span class="token function">pthread_key_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>key<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				pool<span class="token operator">-&gt;</span>stacksize <span class="token operator">=</span> stacksize<span class="token punctuation">;</span>
				pool<span class="token operator">-&gt;</span>nthreads <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
				<span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>tid<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span> <span class="token punctuation">(</span><span class="token class-name">pthread_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				pool<span class="token operator">-&gt;</span>terminate <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">__thrdpool_create_threads</span><span class="token punctuation">(</span>nthreads<span class="token punctuation">,</span> pool<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
					<span class="token keyword">return</span> pool<span class="token punctuation">;</span>

				<span class="token function">pthread_key_delete</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>

			<span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		errno <span class="token operator">=</span> ret<span class="token punctuation">;</span>
		<span class="token function">msgqueue_destroy</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>msgqueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">free</span><span class="token punctuation">(</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">inline</span> <span class="token keyword">void</span> <span class="token function">__thrdpool_schedule</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">thrdpool_task</span> <span class="token operator">*</span>task<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span>
								<span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">__thrdpool_schedule</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">thrdpool_task</span> <span class="token operator">*</span>task<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span>
						 <span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">__thrdpool_task_entry</span> <span class="token operator">*</span><span class="token punctuation">)</span>buf<span class="token punctuation">)</span><span class="token operator">-&gt;</span>task <span class="token operator">=</span> <span class="token operator">*</span>task<span class="token punctuation">;</span>
	<span class="token function">msgqueue_put</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> pool<span class="token operator">-&gt;</span>msgqueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">thrdpool_schedule</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">thrdpool_task</span> <span class="token operator">*</span>task<span class="token punctuation">,</span> <span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">void</span> <span class="token operator">*</span>buf <span class="token operator">=</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token keyword">sizeof</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">__thrdpool_task_entry</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">if</span> <span class="token punctuation">(</span>buf<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token function">__thrdpool_schedule</span><span class="token punctuation">(</span>task<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">thrdpool_increase</span><span class="token punctuation">(</span><span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token class-name">pthread_attr_t</span> attr<span class="token punctuation">;</span>
	<span class="token class-name">pthread_t</span> tid<span class="token punctuation">;</span>
	<span class="token keyword">int</span> ret<span class="token punctuation">;</span>

	ret <span class="token operator">=</span> <span class="token function">pthread_attr_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>stacksize<span class="token punctuation">)</span>
			<span class="token function">pthread_attr_setstacksize</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> pool<span class="token operator">-&gt;</span>stacksize<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
		ret <span class="token operator">=</span> <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid<span class="token punctuation">,</span> <span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> __thrdpool_routine<span class="token punctuation">,</span> pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
			pool<span class="token operator">-&gt;</span>nthreads<span class="token operator">++</span><span class="token punctuation">;</span>

		<span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">pthread_attr_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	errno <span class="token operator">=</span> ret<span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">inline</span> <span class="token keyword">int</span> <span class="token function">thrdpool_in_pool</span><span class="token punctuation">(</span><span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">thrdpool_in_pool</span><span class="token punctuation">(</span><span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">pthread_getspecific</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> pool<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">thrdpool_destroy</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token punctuation">(</span><span class="token operator">*</span>pending<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">struct</span> <span class="token class-name">thrdpool_task</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
					  <span class="token class-name">thrdpool_t</span> <span class="token operator">*</span>pool<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">int</span> in_pool <span class="token operator">=</span> <span class="token function">thrdpool_in_pool</span><span class="token punctuation">(</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">__thrdpool_task_entry</span> <span class="token operator">*</span>entry<span class="token punctuation">;</span>

	<span class="token function">__thrdpool_terminate</span><span class="token punctuation">(</span>in_pool<span class="token punctuation">,</span> pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		entry <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">__thrdpool_task_entry</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">msgqueue_get</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>msgqueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>entry<span class="token punctuation">)</span>
			<span class="token keyword">break</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>pending<span class="token punctuation">)</span>
			<span class="token function">pending</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>entry<span class="token operator">-&gt;</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token function">free</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">pthread_key_delete</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>pool<span class="token operator">-&gt;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">msgqueue_destroy</span><span class="token punctuation">(</span>pool<span class="token operator">-&gt;</span>msgqueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>in_pool<span class="token punctuation">)</span>
		<span class="token function">free</span><span class="token punctuation">(</span>pool<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","workflow-threadpool.html.vue"]]);export{r as default};
