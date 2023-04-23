import React, { useEffect, useRef } from "react";
import { useState } from "react";

export const ConactForm7 = ({ formId, formMarkup }) => {
  const formRef = useRef(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (formRef?.current) {
      const formElement = formRef.current.getElementsByTagName("form")?.[0];
      if (formElement) {
        const handleSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          fetch(
            `${process.env.GATSBY_WP_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
            {
              method: "POST",
              body: formData,
            }
          ).then(() => {
            setHasSubmitted(true);
          });
        };

        formElement.addEventListener("submit", handleSubmit);
        return () => {
          formElement.removeEventListener("submit", handleSubmit);
        };
      }
    }
  }, [formRef, formId]);

  return hasSubmitted ? (
    <div>
      <div className="bg-emerald-900 p-4 text-white">
        Thank you for contancting Us
      </div>
    </div>
  ) : (
    <fieldset ref={formRef} dangerouslySetInnerHTML={{ __html: formMarkup }} />
  );
};
