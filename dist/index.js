import { defineComponent as Y, ref as z, computed as h, onMounted as ee, nextTick as te, createElementBlock as c, openBlock as d, normalizeClass as ae, createElementVNode as m, createCommentVNode as D, Fragment as b, renderList as $, normalizeStyle as G, toDisplayString as k, unref as R, createTextVNode as T } from "vue";
const A = (o) => Math.round(o * 10) / 10, E = (o) => Number(o).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"), I = (o, t, r, i) => ` C${A((r + o) / 2)},${t} ${A((r + o) / 2)},${i} ${r},${i}`, Z = (o, t, r, i) => ` C${o},${A((i + t) / 2)} ${r},${A((i + t) / 2)} ${r},${i}`, le = (o, t, r, i) => {
  let v = `M${t[0]},${r[0]}`;
  for (let a = 0; a < t.length - 1; a++)
    v += I(t[a], r[a], t[a + 1], r[a + 1]);
  v += ` L${[...t].pop()},${[...i].pop()}`;
  for (let a = t.length - 1; a > 0; a--)
    v += I(t[a], i[a], t[a - 1], i[a - 1]);
  return v += " Z", v;
}, ne = (o, t, r, i) => {
  let v = `M${t[0]},${r[0]}`;
  for (let a = 0; a < r.length - 1; a++)
    v += Z(t[a], r[a], t[a + 1], r[a + 1]);
  v += ` L${[...i].pop()},${[...r].pop()}`;
  for (let a = r.length - 1; a > 0; a--)
    v += Z(i[a], r[a], i[a - 1], r[a - 1]);
  return v += " Z", v;
}, H = [
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
], se = (o) => {
  const t = [...H];
  for (; t.length < o; )
    t.push(...H);
  return t.slice(0, o);
}, re = (o = "") => Math.random().toString(36).replace("0.", o), oe = ["width", "height"], ue = ["id", "gradientTransform"], ie = ["offset"], ce = ["d", "fill", "stroke"], de = {
  key: 0,
  class: "vue-funnel-graph__labels"
}, ve = { class: "label__value" }, he = { class: "label__title" }, pe = {
  key: 0,
  class: "label__percentage"
}, fe = {
  key: 1,
  class: "label__segment-percentages"
}, ge = { class: "segment-percentage__list" }, _e = { class: "percentage__list-label" }, me = {
  key: 1,
  class: "vue-funnel-graph__subLabels"
}, ye = /* @__PURE__ */ Y({
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
    const t = o, r = z(), i = z(), v = h(() => t.data.labels || []), a = h(() => t.data.subLabels || []), _ = h(() => t.data.values), g = h(() => t.data.colors ? t.data.colors : se(y.value ? x() : 2)), y = h(() => Array.isArray(_.value[0])), F = h(() => t.direction), N = h(() => t.gradientDirection), W = h(() => t.displayPercent), q = h(() => t.subLabelValue), p = h(() => {
      var s, l;
      return {
        width: t.width || (((s = i.value) == null ? void 0 : s.clientWidth) ?? 800),
        height: t.height || (((l = i.value) == null ? void 0 : l.clientHeight) ?? 300)
      };
    }), w = () => _.value.length, x = () => _.value[0].length, J = () => y.value ? _.value.map((s) => s.reduce((l, e) => l + e, 0)) : _.value, V = h(() => y.value ? J() : _.value), S = h(() => {
      const s = V.value, l = Math.max(...s);
      return s.map((e) => e === 0 ? 0 : A(e * 100 / l));
    }), B = h(() => y.value ? _.value.map((s) => {
      const l = s.reduce((e, n) => e + n, 0);
      return s.map((e) => e === 0 ? 0 : A(e * 100 / l));
    }) : []), K = () => {
      const s = F.value === "vertical" ? p.value.width : p.value.height, l = [];
      for (let e = 0; e <= w(); e++)
        l.push(s / w() * e);
      return l;
    }, Q = () => {
      const s = F.value === "vertical" ? p.value.height : p.value.width, l = V.value, e = Math.max(...l);
      return l.map((n) => s * (1 - n / e) / 2);
    }, U = () => {
      const s = K(), l = Q(), e = F.value === "vertical" ? p.value.height : p.value.width, n = [];
      for (let u = 0; u < w(); u++) {
        const f = [s[u], s[u + 1]], P = [l[u], l[u]], M = [e - l[u + 1] || 0, e - l[u + 1] || 0];
        f.some((C) => isNaN(C)) || P.some((C) => isNaN(C)) || M.some((C) => isNaN(C)) || (F.value === "vertical" ? n.push(ne(u, P, f, M)) : n.push(le(u, f, P, M)));
      }
      return n;
    }, L = h(() => {
      const s = Array.isArray(g.value) ? g.value : [g.value], l = [];
      return s.forEach((e, n) => {
        const u = re(`funnelGradient${n}_`);
        Array.isArray(e) ? l.push({
          id: u,
          colors: e,
          direction: N.value
        }) : l.push({
          id: u,
          colors: [e, e],
          direction: N.value
        });
      }), l;
    }), j = h(() => {
      const s = U(), l = Array.isArray(g.value) ? g.value : [g.value];
      return s.map((e, n) => {
        const u = l[n % l.length], f = L.value[n % L.value.length];
        return {
          d: e,
          fill: `url(#${f.id})`,
          stroke: Array.isArray(u) ? `url(#${f.id})` : u
        };
      });
    }), X = (s) => {
      const l = Array.isArray(g.value) ? g.value : [g.value], e = l[s % l.length];
      return `background-color: ${Array.isArray(e) ? e[0] : e}`;
    };
    return ee(() => {
      te(() => {
      });
    }), (s, l) => (d(), c("div", {
      ref_key: "containerRef",
      ref: r,
      class: ae(["vue-funnel-graph", { "vue-funnel-graph--vertical": F.value === "vertical" }])
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
            (d(!0), c(b, null, $(L.value, (e) => (d(), c("linearGradient", {
              key: e.id,
              id: e.id,
              gradientTransform: e.direction === "vertical" ? "rotate(90)" : ""
            }, [
              (d(!0), c(b, null, $(e.colors, (n, u) => (d(), c("stop", {
                key: `${e.id}-${u}`,
                offset: `${u * 100 / (e.colors.length - 1)}%`,
                style: G(`stop-color: ${n}`)
              }, null, 12, ie))), 128))
            ], 8, ue))), 128))
          ]),
          (d(!0), c(b, null, $(j.value, (e, n) => (d(), c("path", {
            key: n,
            d: e.d,
            fill: e.fill,
            stroke: e.stroke,
            class: "vue-funnel-graph__path"
          }, null, 8, ce))), 128))
        ], 8, oe)) : D("", !0)
      ], 512),
      v.value.length ? (d(), c("div", de, [
        (d(!0), c(b, null, $(v.value, (e, n) => (d(), c("div", {
          key: n,
          class: "vue-funnel-graph__label"
        }, [
          m("div", ve, k(R(E)(V.value[n])), 1),
          m("div", he, k(e), 1),
          W.value && S.value[n] !== 100 ? (d(), c("div", pe, k(S.value[n]) + "% ", 1)) : D("", !0),
          y.value && a.value.length && B.value[n] ? (d(), c("div", fe, [
            m("ul", ge, [
              (d(!0), c(b, null, $(a.value, (u, f) => (d(), c("li", { key: f }, [
                T(k(u) + ": ", 1),
                m("span", _e, k(q.value === "percent" ? `${B.value[n][f]}%` : R(E)(s.data.values[n][f])), 1)
              ]))), 128))
            ])
          ])) : D("", !0)
        ]))), 128))
      ])) : D("", !0),
      a.value.length && !y.value ? (d(), c("div", me, [
        (d(!0), c(b, null, $(a.value, (e, n) => (d(), c("div", {
          key: n,
          class: "vue-funnel-graph__subLabel"
        }, [
          m("div", {
            class: "vue-funnel-graph__subLabel--color",
            style: G(X(n))
          }, null, 4),
          T(" " + k(e), 1)
        ]))), 128))
      ])) : D("", !0)
    ], 2));
  }
}), be = (o, t) => {
  const r = o.__vccOpts || o;
  for (const [i, v] of t)
    r[i] = v;
  return r;
}, $e = /* @__PURE__ */ be(ye, [["__scopeId", "data-v-b2078469"]]), O = (o) => {
  o.component("FunnelGraph", $e);
}, Ae = {
  install: O
};
typeof window < "u" && window.Vue && O(window.Vue);
export {
  $e as FunnelGraph,
  Ae as default
};
