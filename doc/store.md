# firestore設計

- root
  - [collection]application

  - [collection]users
    - {uuid}
      - [collection]acitivities
      - [collection]goalSheets
        - {uuid}
          - [collection]goals
            - {uuid}
              - id
              - __type
              - title
              - order
          - [collection]results
            - {uuid}
              - id
              - __type
              - title
              - no
              - note
          - id
          - __type
          - note
          - title
          - tags
          - valid
      - id
      - __type
      - dispalyName
      - iconUrl


