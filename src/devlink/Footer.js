"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Footer.module.css";

export function Footer({ as: _Component = _Builtin.Section }) {
  return (
    <_Component
      className={_utils.cx(_styles, "footer", "is-secondary")}
      tag="footer"
    >
      <_Builtin.Block className={_utils.cx(_styles, "container")} tag="div">
        <_Builtin.Heading
          className={_utils.cx(_styles, "heading_huge")}
          tag="h2"
        >
          {"Let"}
          {"’"}
          {"s connect and collaborate"}
          <br />
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "flex_horizontal",
            "is-space-between",
            "tablet-vertical",
            "tablet-x-center",
            "gap-small",
            "margin-top_medium"
          )}
          tag="div"
        >
          <_Builtin.Link
            className={_utils.cx(_styles, "footer_link")}
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "paragraph_xlarge")}
              tag="div"
            >
              {"Contact"}
            </_Builtin.Block>
          </_Builtin.Link>
          <_Builtin.List
            className={_utils.cx(
              _styles,
              "flex_horizontal",
              "is-y-center",
              "is-x-center",
              "gap-xsmall",
              "is-wrap",
              "margin-bottom_none",
              "padding_none"
            )}
            tag="ul"
            role="list"
            unstyled={true}
          >
            <_Builtin.ListItem
              className={_utils.cx(_styles, "margin-bottom_none")}
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block="inline"
                options={{
                  href: "#",
                }}
              >
                <_Builtin.Block tag="div">{"Portfolio"}</_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.ListItem>
            <_Builtin.ListItem
              className={_utils.cx(_styles, "margin-bottom_none")}
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block="inline"
                options={{
                  href: "#",
                }}
              >
                <_Builtin.Block tag="div">{"Photos"}</_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.ListItem>
            <_Builtin.ListItem
              className={_utils.cx(_styles, "margin-bottom_none")}
            >
              <_Builtin.Link
                className={_utils.cx(_styles, "footer_link")}
                button={false}
                block="inline"
                options={{
                  href: "#",
                }}
              >
                <_Builtin.Block tag="div">{"Network"}</_Builtin.Block>
              </_Builtin.Link>
            </_Builtin.ListItem>
          </_Builtin.List>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
