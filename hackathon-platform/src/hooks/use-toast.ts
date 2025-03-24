export function useToast() {
    return {
      toast: ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
        console.log(`${variant ? `[${variant.toUpperCase()}] ` : ""}${title}: ${description}`)
      },
    }
  }