import{_ as a,V as t,W as p,X as n,Y as e,Z as o,a1 as c,F as i}from"./framework-d934f75f.js";const l={},u=c(`<h1 id="utf8转gbk代码" tabindex="-1"><a class="header-anchor" href="#utf8转gbk代码" aria-hidden="true">#</a> UTF8转GBK代码</h1><p>目录结构如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost gbk-utf8<span class="token punctuation">]</span><span class="token comment"># tree</span>
<span class="token builtin class-name">.</span>
├── main.c
├── utf8.c
└── utf8.h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="utf8-h" tabindex="-1"><a class="header-anchor" href="#utf8-h" aria-hidden="true">#</a> utf8.h</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">/**
 * Copyright (C) 2008  Huang Guan
 * Copyright (C) 2011  iBoxpay.com inc.
 *
 * $Id: 509d9187fcedee642b722b528884dc8378b93ede $
 *
 * Description: GBK UTF-8 iconv functions header file
 *
 * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifndef</span> <span class="token expression">_UTF8_H</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_UTF8_H</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token keyword">extern</span> <span class="token string">&quot;C&quot;</span> <span class="token punctuation">{</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token comment">/**
 * UTF-8 to GBK
 * @param src [in]
 * @param dst [out]
 * @param len [in] The most bytes which starting at dst, will be written.
 *
 */</span>
<span class="token keyword">void</span> <span class="token function">utf8_to_gb</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> dst<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * GBK to UTF-8
 *
 * @param src [in]
 * @param dst [out]
 * @param len [in] The most bytes which starting at dst, will be written.
 */</span>
<span class="token keyword">void</span> <span class="token function">gb_to_utf8</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> dst<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__cplusplus</span></span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span>  <span class="token comment">// end of _UTF8_H</span></span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="utf8-c" tabindex="-1"><a class="header-anchor" href="#utf8-c" aria-hidden="true">#</a> utf8.c</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">/**
 *  Copyright (C) 2008  Huang Guan
 *  Copyright (C) 2011  iBoxpay.com inc.
 *
 *  $Id: 691029ec2ac041372193855b2eb56db17bdac132 $
 *
 *  Description: This file mainly includes the functions about utf8
 *
 *  History:
 *  2008-7-10 13:31:57 Created.
 *  2011-12-28 Format the code style, and add comments by Lytsing
 *
 * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__WIN32__</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;windows.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iconv.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;errno.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;memory.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;utf8.h&quot;</span></span>


<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">__WIN32__</span></span>
<span class="token keyword">void</span> <span class="token function">utf8_to_gb</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> dst<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    WCHAR<span class="token operator">*</span> strA<span class="token punctuation">;</span>
    <span class="token keyword">int</span> i<span class="token operator">=</span> <span class="token function">MultiByteToWideChar</span><span class="token punctuation">(</span>CP_UTF8<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> src<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERROR.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    strA <span class="token operator">=</span> <span class="token punctuation">(</span>WCHAR<span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>i <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">MultiByteToWideChar</span><span class="token punctuation">(</span>CP_UTF8<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> src<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> strA<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    i <span class="token operator">=</span> <span class="token function">WideCharToMultiByte</span><span class="token punctuation">(</span>CP_ACP<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> strA<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">&gt;=</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret <span class="token operator">=</span> <span class="token function">WideCharToMultiByte</span><span class="token punctuation">(</span>CP_ACP<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> strA<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> dst<span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dst<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">free</span><span class="token punctuation">(</span>strA<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">free</span><span class="token punctuation">(</span> strA <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">gb_to_utf8</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> dst<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    WCHAR<span class="token operator">*</span> strA<span class="token punctuation">;</span>
    <span class="token keyword">int</span> i<span class="token operator">=</span> <span class="token function">MultiByteToWideChar</span><span class="token punctuation">(</span>CP_ACP<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> src<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;ERROR.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    strA <span class="token operator">=</span> <span class="token punctuation">(</span>WCHAR<span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>i <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">MultiByteToWideChar</span><span class="token punctuation">(</span>CP_ACP<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> src<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> strA<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    i <span class="token operator">=</span> <span class="token function">WideCharToMultiByte</span><span class="token punctuation">(</span>CP_UTF8<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> strA<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">&gt;=</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret <span class="token operator">=</span> <span class="token function">WideCharToMultiByte</span><span class="token punctuation">(</span>CP_UTF8<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> strA<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> dst<span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dst<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">free</span><span class="token punctuation">(</span>strA<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">free</span><span class="token punctuation">(</span>strA<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span>   <span class="token comment">//Linux</span></span>
<span class="token comment">// starkwong: In iconv implementations, inlen and outlen should be type of size_t not uint, which is different in length on Mac</span>
<span class="token keyword">void</span> <span class="token function">utf8_to_gb</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> dst<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    size_t inlen <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    size_t outlen <span class="token operator">=</span> len<span class="token punctuation">;</span>

    <span class="token comment">// duanqn: The iconv function in Linux requires non-const char *</span>
    <span class="token comment">// So we need to copy the source string</span>
    <span class="token keyword">char</span><span class="token operator">*</span> inbuf <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token operator">*</span> inbuf_hold <span class="token operator">=</span> inbuf<span class="token punctuation">;</span>   <span class="token comment">// iconv may change the address of inbuf</span>
                                <span class="token comment">// so we use another pointer to keep the address</span>
    <span class="token function">memcpy</span><span class="token punctuation">(</span>inbuf<span class="token punctuation">,</span> src<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">char</span><span class="token operator">*</span> outbuf <span class="token operator">=</span> dst<span class="token punctuation">;</span>
    iconv_t cd<span class="token punctuation">;</span>
    cd <span class="token operator">=</span> <span class="token function">iconv_open</span><span class="token punctuation">(</span><span class="token string">&quot;GBK&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cd <span class="token operator">!=</span> <span class="token punctuation">(</span>iconv_t<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret <span class="token operator">=</span> <span class="token function">iconv</span><span class="token punctuation">(</span>cd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>inbuf<span class="token punctuation">,</span> <span class="token operator">&amp;</span>inlen<span class="token punctuation">,</span> <span class="token operator">&amp;</span>outbuf<span class="token punctuation">,</span> <span class="token operator">&amp;</span>outlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;iconv failed err: %s\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">strerror</span><span class="token punctuation">(</span>errno<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">iconv_close</span><span class="token punctuation">(</span>cd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">free</span><span class="token punctuation">(</span>inbuf_hold<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// Don&#39;t pass in inbuf as it may have been modified</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">gb_to_utf8</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">,</span> <span class="token keyword">char</span><span class="token operator">*</span> dst<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> ret <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    size_t inlen <span class="token operator">=</span> <span class="token function">strlen</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    size_t outlen <span class="token operator">=</span> len<span class="token punctuation">;</span>

    <span class="token comment">// duanqn: The iconv function in Linux requires non-const char *</span>
    <span class="token comment">// So we need to copy the source string</span>
    <span class="token keyword">char</span><span class="token operator">*</span> inbuf <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token operator">*</span> inbuf_hold <span class="token operator">=</span> inbuf<span class="token punctuation">;</span>   <span class="token comment">// iconv may change the address of inbuf</span>
                                <span class="token comment">// so we use another pointer to keep the address</span>
    <span class="token function">memcpy</span><span class="token punctuation">(</span>inbuf<span class="token punctuation">,</span> src<span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">char</span><span class="token operator">*</span> outbuf2 <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
    <span class="token keyword">char</span><span class="token operator">*</span> outbuf <span class="token operator">=</span> dst<span class="token punctuation">;</span>
    iconv_t cd<span class="token punctuation">;</span>

    <span class="token comment">// starkwong: if src==dst, the string will become invalid during conversion since UTF-8 is 3 chars in Chinese but GBK is mostly 2 chars</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>src <span class="token operator">==</span> dst<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        outbuf2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">memset</span><span class="token punctuation">(</span>outbuf2<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        outbuf <span class="token operator">=</span> outbuf2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    cd <span class="token operator">=</span> <span class="token function">iconv_open</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GBK&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cd <span class="token operator">!=</span> <span class="token punctuation">(</span>iconv_t<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ret <span class="token operator">=</span> <span class="token function">iconv</span><span class="token punctuation">(</span>cd<span class="token punctuation">,</span> <span class="token operator">&amp;</span>inbuf<span class="token punctuation">,</span> <span class="token operator">&amp;</span>inlen<span class="token punctuation">,</span> <span class="token operator">&amp;</span>outbuf<span class="token punctuation">,</span> <span class="token operator">&amp;</span>outlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ret <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;iconv failed err: %s\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">strerror</span><span class="token punctuation">(</span>errno<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>outbuf2 <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">strcpy</span><span class="token punctuation">(</span>dst<span class="token punctuation">,</span> outbuf2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">free</span><span class="token punctuation">(</span>outbuf2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">iconv_close</span><span class="token punctuation">(</span>cd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">free</span><span class="token punctuation">(</span>inbuf_hold<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// Don&#39;t pass in inbuf as it may have been modified</span>
<span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试代码main-c" tabindex="-1"><a class="header-anchor" href="#测试代码main-c" aria-hidden="true">#</a> 测试代码main.c</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;utf8.h&quot;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h&gt;</span></span>
<span class="token keyword">void</span> <span class="token function">printContent</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span>p<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token comment">//打印其内容, char *</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span>i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span><span class="token function">strlen</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;%02x &quot;</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">char</span><span class="token punctuation">)</span>p<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">char</span> dst<span class="token punctuation">[</span><span class="token number">4096</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token keyword">char</span> src<span class="token punctuation">[</span><span class="token number">7</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">0xe6</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">0x82</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">0xa8</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">0xe5</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">0xa5</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">0xbd</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token number">0x00</span><span class="token punctuation">}</span><span class="token punctuation">;</span><span class="token comment">//您好</span>
    <span class="token function">utf8_to_gb</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> dst<span class="token punctuation">,</span> <span class="token number">4096</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printContent</span><span class="token punctuation">(</span>dst<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="编译运行" tabindex="-1"><a class="header-anchor" href="#编译运行" aria-hidden="true">#</a> 编译运行</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>g++ main.c utf8.c
./a.out
c4 fa ba c3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&quot;您好&quot;的GBK编码的输出C4fa bac3是正确的。</p><h1 id="ps" tabindex="-1"><a class="header-anchor" href="#ps" aria-hidden="true">#</a> PS</h1><p>该代码在Linux平台下，本人测试通过，Windows平台本人尚未测试。</p><h1 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考：</h1>`,15),r={href:"https://github.com/lytsing/gbk-utf8",target:"_blank",rel:"noopener noreferrer"};function k(d,v){const s=i("ExternalLinkIcon");return t(),p("div",null,[u,n("p",null,[n("a",r,[e("https://github.com/lytsing/gbk-utf8"),o(s)])])])}const b=a(l,[["render",k],["__file","utf8-gbk.html.vue"]]);export{b as default};
