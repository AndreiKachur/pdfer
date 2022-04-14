const getKeyframes = (id, keyA, keyB, keyC) => {
  return [
    {
      targets: id,
      keyframes: [
        {
          left: keyA,
          width: 2,
        },
        {
          left: keyB,
          width: 100,
        },
        {
          left: keyC,
          width: 2,
        },
        {
          left: keyB,
          width: 100,
        },
      ],
      duration: 6700,
      loop: true,
    },
  ];
};

export default getKeyframes;
