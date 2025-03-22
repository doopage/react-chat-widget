import React, { useEffect, useState } from 'react';

interface YoutubeProps {
  id?: string;
}

export const parseYoutubeLink = (url: URL): YoutubeProps | null => {
  if (!/(^|\.)youtube\.com(\.|$)/.test(url.hostname)) {
    return null;
  }
  if (url.pathname != '/watch') {
    return null;
  }
  const id = url.searchParams.get('v') as string;
  if (!id) {
    return null;
  }
  return { id };
};

export const YoutubePreview: React.FC<YoutubeProps> = ({ id }) => {
  return (
    <div className="youtube-preview">
      <iframe src={`https://www.youtube.com/embed/${id}`} />
    </div>
  );
};

interface TikTokProps {
  productId?: string;
  url?: string;
}

export const parseTiktokLink = (url: URL): TikTokProps | null => {
  if (!/(^|\.)vt\.tiktok\.com(\.|$)/.test(url.hostname)) {
    return null;
  }
  const m = /^\/(.+)\//.exec(url.pathname);
  if (!m) {
    return null;
  }
  return { url: url.toString() };
};

export const TiktokPreview: React.FC<TikTokProps> = ({ productId, url }) => {
  const [embedId, setEmbedId] = useState(productId);
  useEffect(() => void fetch(`https://www.tiktok.com/oembed?url=${url}/`)
    .then(async (res) => {
      const { embed_type, embed_product_id } = await res.json();
      if (embed_type === 'video') {
        setEmbedId(embed_product_id);
      }
    }), [url]);
  return (
    <div className="tiktok-preview">
      {embedId && <iframe src={`https://www.tiktok.com/player/v1/${embedId}/`} />}
    </div>
  );
};
