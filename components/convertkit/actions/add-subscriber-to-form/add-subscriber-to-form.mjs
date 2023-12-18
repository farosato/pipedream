import convertkit from "../../convertkit.app.mjs";

export default {
  key: "convertkit-add-subscriber-to-form",
  name: "Add subscriber to a form",
  description:
    "Add subscriber to a form. [See docs here](https://developers.convertkit.com/#add-subscriber-to-a-form)",
  version: "0.0.3",
  type: "action",
  props: {
    convertkit,
    subscriber: {
      propDefinition: [
        convertkit,
        "subscriber",
        () => ({
          returnField: "email_address",
        }),
      ],
    },
    firstName: {
      type: "string",
      label: "First Name",
      description: "The subscriber first name (optional)",
    },
    customFields: {
      type: "object",
      label: "Custom Fields",
      description:
        "Custom fields to be defined on the subscriber (optional). The custom fields must exist before you can use them here.",
    },
    form: {
      propDefinition: [convertkit, "form"],
    },
  },
  async run({ $ }) {
    const response = await this.convertkit.addSubscriberToForm(
      this.subscriber,
      this.form,
      $,
      this.firstName,
      this.customFields
    );
    if (response) {
      $.export("$summary", "Successfully added subscriber to form");
    }
    return response;
  },
};
