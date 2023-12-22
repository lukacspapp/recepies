'use client'

import React from 'react'
import YouTube from "react-youtube";

type VideoProps = {
  id: string
}

export default function Video({ id }: VideoProps) {

  const opts = {
    height: '240',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  return (
    <div className="w-auto h-96">
      <YouTube
        videoId={id}
        className="w-full h-96"
        opts={opts}
        loading="lazy"
        onReady={(e) => {
          e.target.pauseVideo()
        }}
      />
    </div>
  )
}