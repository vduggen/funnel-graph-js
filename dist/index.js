import { defineComponent as X, ref as z, computed as h, onMounted as Y, nextTick as ee, createElementBlock as c, openBlock as d, normalizeClass as te, createElementVNode as m, createCommentVNode as C, Fragment as b, renderList as $, normalizeStyle as G, toDisplayString as k, unref as R, createTextVNode as T } from "vue";
const A = (o) => Math.round(o * 10) / 10, E = (o) => Number(o).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"), I = (o, t, r, i) => ` C${A((r + o) / 2)},${t} ${A((r + o) / 2)},${i} ${r},${i}`, N = (o, t, r, i) => ` C${o},${A((i + t) / 2)} ${r},${A((i + t) / 2)} ${r},${i}`, le = (o, t, r, i) => {
  let v = `M${t[0]},${r[0]}`;
  for (let l = 0; l < t.length - 1; l++)
    v += I(t[l], r[l], t[l + 1], r[l + 1]);
  v += ` L${[...t].pop()},${[...i].pop()}`;
  for (let l = t.length - 1; l > 0; l--)
    v += I(t[l], i[l], t[l - 1], i[l - 1]);
  return v += " Z", v;
}, ae = (o, t, r, i) => {
  let v = `M${t[0]},${r[0]}`;
  for (let l = 0; l < r.length - 1; l++)
    v += N(t[l], r[l], t[l + 1], r[l + 1]);
  v += ` L${[...i].pop()},${[...r].pop()}`;
  for (let l = r.length - 1; l > 0; l--)
    v += N(i[l], r[l], i[l - 1], r[l - 1]);
  return v += " Z", v;
}, Z = [
  "#FF4589",
  "#FF5050",
  "#05DF9D",
  "#4FF2FD",
  "#2D9CDB",
  "#A0BBFF",
  "#FFD76F",
  "#F2C94C",
  "#FF9A9A",
  "#FFB178"
], ne = (o) => {
  const t = [...Z];
  for (; t.length < o; )
    t.push(...Z);
  return t.slice(0, o);
}, se = (o = "") => Math.random().toString(36).replace("0.", o), re = ["width", "height"], oe = ["id", "gradientTransform"], ue = ["offset"], ie = ["d", "fill", "stroke"], ce = {
  key: 0,
  class: "vue-funnel-graph__labels"
}, de = { class: "label__value" }, ve = { class: "label__title" }, he = {
  key: 0,
  class: "label__percentage"
}, pe = {
  key: 1,
  class: "label__segment-percentages"
}, ge = { class: "segment-percentage__list" }, fe = { class: "percentage__list-label" }, _e = {
  key: 1,
  class: "vue-funnel-graph__subLabels"
}, me = /* @__PURE__ */ X({
  __name: "FunnelGraph",
  props: {
    data: {},
    config: {},
    width: { default: 800 },
    height: { default: 300 },
    direction: { default: "horizontal" },
    gradientDirection: { default: "horizontal" },
    displayPercent: { type: Boolean, default: !0 },
    subLabelValue: { default: "percent" }
  },
  setup(o) {
    const t = o, r = z(), i = z(), v = h(() => t.data.labels || []), l = h(() => t.data.subLabels || []), _ = h(() => t.data.values), g = h(() => t.data.colors ? t.data.colors : ne(y.value ? q() : 2)), y = h(() => Array.isArray(_.value[0])), F = h(() => t.direction), L = h(() => t.gradientDirection), O = h(() => t.displayPercent), W = h(() => t.subLabelValue), p = h(() => {
      var s, a;
      return {
        width: t.width || (((s = i.value) == null ? void 0 : s.clientWidth) ?? 800),
        height: t.height || (((a = i.value) == null ? void 0 : a.clientHeight) ?? 300)
      };
    }), D = () => _.value.length, q = () => _.value[0].length, x = () => y.value ? _.value.map((s) => s.reduce((a, e) => a + e, 0)) : _.value, w = h(() => y.value ? x() : _.value), P = h(() => {
      const s = w.value, a = Math.max(...s);
      return s.map((e) => e === 0 ? 0 : A(e * 100 / a));
    }), M = h(() => y.value ? _.value.map((s) => {
      const a = s.reduce((e, n) => e + n, 0);
      return s.map((e) => e === 0 ? 0 : A(e * 100 / a));
    }) : []), J = () => {
      const s = F.value === "vertical" ? p.value.width : p.value.height, a = [];
      for (let e = 0; e <= D(); e++)
        a.push(s / D() * e);
      return a;
    }, K = () => {
      const s = F.value === "vertical" ? p.value.height : p.value.width, a = w.value, e = Math.max(...a);
      return a.map((n) => s * (1 - n / e) / 2);
    }, Q = () => {
      const s = J(), a = K(), e = F.value === "vertical" ? p.value.height : p.value.width, n = [];
      for (let u = 0; u < D(); u++) {
        const f = [s[u], s[u + 1]], S = [a[u], a[u]], B = [e - a[u + 1], e - a[u + 1]];
        F.value === "vertical" ? n.push(ae(u, S, f, B)) : n.push(le(u, f, S, B));
      }
      return n;
    }, V = h(() => {
      const s = Array.isArray(g.value) ? g.value : [g.value], a = [];
      return s.forEach((e, n) => {
        const u = se(`funnelGradient${n}_`);
        Array.isArray(e) ? a.push({
          id: u,
          colors: e,
          direction: L.value
        }) : a.push({
          id: u,
          colors: [e, e],
          direction: L.value
        });
      }), a;
    }), U = h(() => {
      const s = Q(), a = Array.isArray(g.value) ? g.value : [g.value];
      return s.map((e, n) => {
        const u = a[n % a.length], f = V.value[n % V.value.length];
        return {
          d: e,
          fill: `url(#${f.id})`,
          stroke: Array.isArray(u) ? `url(#${f.id})` : u
        };
      });
    }), j = (s) => {
      const a = Array.isArray(g.value) ? g.value : [g.value], e = a[s % a.length];
      return `background-color: ${Array.isArray(e) ? e[0] : e}`;
    };
    return Y(() => {
      ee(() => {
      });
    }), (s, a) => (d(), c("div", {
      ref_key: "containerRef",
      ref: r,
      class: te(["vue-funnel-graph", { "vue-funnel-graph--vertical": F.value === "vertical" }])
    }, [
      m("div", {
        ref_key: "graphContainerRef",
        ref: i,
        class: "vue-funnel-graph__container"
      }, [
        p.value.width && p.value.height ? (d(), c("svg", {
          key: 0,
          width: p.value.width,
          height: p.value.height,
          class: "vue-funnel-graph__svg"
        }, [
          m("defs", null, [
            (d(!0), c(b, null, $(V.value, (e) => (d(), c("linearGradient", {
              key: e.id,
              id: e.id,
              gradientTransform: e.direction === "vertical" ? "rotate(90)" : ""
            }, [
              (d(!0), c(b, null, $(e.colors, (n, u) => (d(), c("stop", {
                key: `${e.id}-${u}`,
                offset: `${u * 100 / (e.colors.length - 1)}%`,
                style: G(`stop-color: ${n}`)
              }, null, 12, ue))), 128))
            ], 8, oe))), 128))
          ]),
          (d(!0), c(b, null, $(U.value, (e, n) => (d(), c("path", {
            key: n,
            d: e.d,
            fill: e.fill,
            stroke: e.stroke,
            class: "vue-funnel-graph__path"
          }, null, 8, ie))), 128))
        ], 8, re)) : C("", !0)
      ], 512),
      v.value.length ? (d(), c("div", ce, [
        (d(!0), c(b, null, $(v.value, (e, n) => (d(), c("div", {
          key: n,
          class: "vue-funnel-graph__label"
        }, [
          m("div", de, k(R(E)(w.value[n])), 1),
          m("div", ve, k(e), 1),
          O.value && P.value[n] !== 100 ? (d(), c("div", he, k(P.value[n]) + "% ", 1)) : C("", !0),
          y.value && l.value.length && M.value[n] ? (d(), c("div", pe, [
            m("ul", ge, [
              (d(!0), c(b, null, $(l.value, (u, f) => (d(), c("li", { key: f }, [
                T(k(u) + ": ", 1),
                m("span", fe, k(W.value === "percent" ? `${M.value[n][f]}%` : R(E)(s.data.values[n][f])), 1)
              ]))), 128))
            ])
          ])) : C("", !0)
        ]))), 128))
      ])) : C("", !0),
      l.value.length && !y.value ? (d(), c("div", _e, [
        (d(!0), c(b, null, $(l.value, (e, n) => (d(), c("div", {
          key: n,
          class: "vue-funnel-graph__subLabel"
        }, [
          m("div", {
            class: "vue-funnel-graph__subLabel--color",
            style: G(j(n))
          }, null, 4),
          T(" " + k(e), 1)
        ]))), 128))
      ])) : C("", !0)
    ], 2));
  }
}), ye = (o, t) => {
  const r = o.__vccOpts || o;
  for (const [i, v] of t)
    r[i] = v;
  return r;
}, be = /* @__PURE__ */ ye(me, [["__scopeId", "data-v-357e8d6a"]]), H = (o) => {
  o.component("FunnelGraph", be);
}, ke = {
  install: H
};
typeof window < "u" && window.Vue && H(window.Vue);
export {
  be as FunnelGraph,
  ke as default
};
