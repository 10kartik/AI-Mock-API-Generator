const cachedResponses = {
  "GET /v1/accounts": {
    "default": {
      account_ids: ["abc1234abc", "def5678def"],
      account_map_by_id: {
        abc1234abc: {
          id: "abc1234abc",
          name: "Greg Inc.",
          additional_fields: {
            website: "www.Greginc.com",
          },
          account_contact_associations_id: "xyz1234xyz",
        },
        def5678def: {
          id: "def5678def",
          name: "Greg Enterprises",
          additional_fields: {
            website: "www.Gregenterprises.com",
          },
          account_contact_associations_id: "uvw5678uvw",
        },
      },
      contact_map_by_id: {
        xyz1234xyz: {
          id: "xyz1234xyz",
          name: "Greg Smith",
          additional_fields: {
            email: "Greg.smith@example.com",
          },
        },
        uvw5678uvw: {
          id: "uvw5678uvw",
          name: "Greg Johnson",
          additional_fields: {
            email: "Greg.johnson@example.com",
          },
        },
      },
      account_contact_associations_map_by_id: {
        abc1234abc: {
          contact_ids: ["xyz1234xyz"],
        },
        def5678def: {
          contact_ids: ["uvw5678uvw"],
        },
      },
      next_page_payload: {
        pagination_identifier: "nextPageIdentifier",
      },
    },
  },
};

module.exports = cachedResponses;
