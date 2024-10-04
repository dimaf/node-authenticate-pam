{
   "variables": {
    "standalone_static_library%": 0
  },
  'targets': [
    {
      'target_name': 'authenticate_pam',
      'sources': [ 'authenticate_pam.cc' ],
      'libraries': [ '-lpam' ],
      'include_dirs': [
        "<!(node -e \"require('nan')\")"
      ],
      "conditions": [
        [ "standalone_static_library==1", {
          "type": "static_library"
        }, {
          "type": "shared_library"
        }]
      ]
    }
  ]
}