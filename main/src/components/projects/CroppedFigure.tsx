export default function CroppedFigure({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <div className='aspect-[4/3] w-full overflow-hidden'>
      <img src={src} alt={alt} loading='lazy' className='h-full w-full object-cover' />
    </div>
  )
}