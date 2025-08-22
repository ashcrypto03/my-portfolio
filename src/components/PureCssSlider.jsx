import React, { useMemo } from "react";
import "../pureCarousel.css";

/**
 * PureCssSlider — "slider one" using radio inputs + CSS only
 * Props:
 *  - items: array of URLs or React nodes. If string starts with http, renders iframe.
 *  - name: optional instance name
 *  - showArrows (default true)
 *  - showDots (default true)
 *  - rounded (default true)
 */
export default function PureCssSlider({
  items = [],
  name,
  className = "",
  showArrows = true,
  showDots = true,
  rounded = true,
}) {
  const uid = useMemo(() => name || `pcc-${Math.random().toString(36).slice(2, 8)}`, [name]);

  // Build dynamic CSS for any number of slides, scoped to this instance
  const dynamicCSS = useMemo(() => {
    let rules = ``;
    for (let i = 0; i < items.length; i++) {
      const idx = i + 1;
      rules += `.${uid} .pcc-carousel__activator:nth-of-type(${idx}):checked ~ .pcc-carousel__track{transform:translateX(-${i * 100}%);}\n`;
      rules += `.${uid} .pcc-carousel__activator:nth-of-type(${idx}):checked ~ .pcc-carousel__controls:nth-of-type(${idx}){display:block;opacity:1;}\n`;
      rules += `.${uid} .pcc-carousel__activator:nth-of-type(${idx}):checked ~ .pcc-carousel__indicators .pcc-carousel__indicator:nth-of-type(${idx}){opacity:1;}\n`;
    }
    return rules;
  }, [items.length, uid]);

  return (
    <ul className={`pcc-carousel ${uid} ${className}`.trim()}>
      <style dangerouslySetInnerHTML={{ __html: dynamicCSS }} />

      {items.map((_, i) => (
        <input
          key={`a-${i}`}
          className="pcc-carousel__activator"
          type="radio"
          name={uid}
          id={`${uid}-slide-${i}`}
          defaultChecked={i === 0}
        />
      ))}

      {items.map((_, i) => {
        const prev = i === 0 ? items.length - 1 : i - 1;
        const next = i === items.length - 1 ? 0 : i + 1;
        return (
          <div key={`c-${i}`} className="pcc-carousel__controls" aria-hidden>
            {showArrows && (
              <>
                <label className="pcc-carousel__control pcc-carousel__control--backward" htmlFor={`${uid}-slide-${prev}`} />
                <label className="pcc-carousel__control pcc-carousel__control--forward" htmlFor={`${uid}-slide-${next}`} />
              </>
            )}
          </div>
        );
      })}

      <div className="pcc-carousel__track">
        {items.map((item, i) => (
          <li key={`s-${i}`} className="pcc-carousel__slide">
            <div className={`pcc-border pcc-shadow ${rounded ? "pcc-rounded" : ""}`}>
              <div style={{ aspectRatio: "9 / 16", width: "100%" }}>
                {typeof item === "string" && /^https?:\/\//.test(item) ? (
                  <iframe
                    src={item}
                    title={`slide-${i}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ border: 0, width: "100%", height: "100%" }}
                  />
                ) : (
                  item
                )}
              </div>
            </div>
          </li>
        ))}
      </div>

      {showDots && (
        <div className="pcc-carousel__indicators">
          {items.map((_, i) => (
            <label key={`d-${i}`} className="pcc-carousel__indicator" htmlFor={`${uid}-slide-${i}`} />
          ))}
        </div>
      )}
    </ul>
  );
}
